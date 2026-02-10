// background.js - Service worker for Amazon Product Analyzer

const GEMINI_API_BASE =
  'https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent';

let lastCallTime = 0;
let isAnalyzing = false;

/* =========================
   RATE LIMIT (prevents 429)
========================= */
async function rateLimit() {
  const now = Date.now();
  const diff = now - lastCallTime;

  if (diff < 2000) {
    await new Promise(r => setTimeout(r, 2000 - diff));
  }

  lastCallTime = Date.now();
}


/* =========================
   MESSAGE LISTENER
========================= */
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'analyzeProduct') {
    handleProductAnalysis(request.data)
      .then(analysis => sendResponse({ analysis }))
      .catch(error => sendResponse({ error: error.message }));
    return true;
  }

  if (request.action === 'saveApiKey') {
    chrome.storage.sync.set({ geminiApiKey: request.apiKey }, () => {
      if (chrome.runtime.lastError) {
        sendResponse({ success: false });
      } else {
        sendResponse({ success: true });
      }
    });
    return true;
  }

  if (request.action === 'getApiKey') {
    chrome.storage.sync.get(['geminiApiKey'], (result) => {
      sendResponse({ apiKey: result.geminiApiKey || '' });
    });
    return true;
  }
});


/* =========================
   MAIN HANDLER
========================= */
async function handleProductAnalysis(productData) {
  if (isAnalyzing) return; // prevent duplicate calls
  isAnalyzing = true;

  const apiKey = await getApiKey();

  if (!apiKey) {
    isAnalyzing = false;
    throw new Error('Gemini API key not configured.');
  }

  const prompt = buildAnalysisPrompt(productData);

  const analysis = await callGeminiAPI(apiKey, prompt);

  isAnalyzing = false;
  return analysis;
}


/* =========================
   PROMPT BUILDER (optimized)
========================= */
function buildAnalysisPrompt(productData) {
  return `
Analyze this Amazon product and return STRICT JSON only.

Title: ${productData.title}

Description:
${productData.description}

Reviews:
${productData.reviews.slice(0, 8).join('\n')}

Return JSON:

{
  "pros": [],
  "cons": [],
  "goodToKnow": [],
  "notableFeatures": []
}

Rules:
- Max 5 points per section
- Short bullet sentences
- JSON only
`;
}


/* =========================
   GEMINI CALL
========================= */
async function callGeminiAPI(apiKey, prompt) {
  await rateLimit();

  const url = `${GEMINI_API_BASE}?key=${apiKey}`;

  const body = {
    contents: [{
      parts: [{ text: prompt }]
    }],
    generationConfig: {
      temperature: 0.5,
      maxOutputTokens: 400 // ⭐ prevents truncation + cheaper
    }
  };

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });

  // ⭐ auto retry for 429
  if (response.status === 429) {
    await new Promise(r => setTimeout(r, 15000));
    return callGeminiAPI(apiKey, prompt);
  }

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.error?.message || 'API error');
  }

  const data = await response.json();

  const text =
    data?.candidates?.[0]?.content?.parts?.[0]?.text || '';

  return parseGeminiResponse(text);
}


/* =========================
   SAFE JSON PARSER
========================= */
function parseGeminiResponse(text) {
  try {
    const match = text.match(/\{[\s\S]*\}/);

    if (!match) throw new Error('No JSON found');

    const parsed = JSON.parse(match[0]);

    return {
      pros: parsed.pros ?? [],
      cons: parsed.cons ?? [],
      goodToKnow: parsed.goodToKnow ?? [],
      notableFeatures: parsed.notableFeatures ?? []
    };

  } catch {
    return {
      pros: ['AI response formatting issue'],
      cons: ['Try again'],
      goodToKnow: [],
      notableFeatures: []
    };
  }
}


/* =========================
   STORAGE
========================= */
async function getApiKey() {
  return new Promise(resolve => {
    chrome.storage.sync.get(['geminiApiKey'], r => {
      resolve(r.geminiApiKey || '');
    });
  });
}

console.log('[Background] Service worker loaded');
