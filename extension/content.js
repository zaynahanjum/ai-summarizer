// content.js - Amazon Product Analyzer Content Script

(function() {
  'use strict';

  const CONFIG = {
    maxRetries: 5,
    retryDelay: 1500, // ms
    minReviewsForAnalysis: 3,
    maxReviewsToScrape: 20,
    maxDescriptionLength: 2000,
    cardInsertionDelay: 500
  };

  let analysisCard = null;
  let isAnalyzing = false;

  function isProductPage() {
    const url = window.location.href;
    const dpPattern = /\/dp\/[A-Z0-9]{10}/;
    const gpPattern = /\/gp\/product\/[A-Z0-9]{10}/;
    return dpPattern.test(url) || gpPattern.test(url);
  }

  function extractASIN() {
    const match = window.location.href.match(/\/(?:dp|product)\/([A-Z0-9]{10})/);
    return match ? match[1] : null;
  }

  function scrapeProductTitle() {
    const selectors = [
      '#productTitle',
      '#title',
      'h1.product-title',
      'span[data-a-size="large"].product-title-word-break'
    ];

    for (const selector of selectors) {
      const element = document.querySelector(selector);
      if (element) {
        return element.textContent.trim();
      }
    }

    return 'Unknown Product';
  }

  function scrapeProductDescription() {
    let description = '';

    const bulletContainer = document.querySelector('#feature-bullets ul');
    if (bulletContainer) {
      const bullets = bulletContainer.querySelectorAll('li:not(.aok-hidden) span.a-list-item');
      bullets.forEach(bullet => {
        const text = bullet.textContent.trim();
        if (text && text.length > 5) {
          description += text + '\n';
        }
      });
    }

    if (!description) {
      const descSection = document.querySelector('#productDescription p');
      if (descSection) {
        description = descSection.textContent.trim();
      }
    }

    if (description.length > CONFIG.maxDescriptionLength) {
      description = description.substring(0, CONFIG.maxDescriptionLength) + '...';
    }

    return description || 'No description available';
  }

  function scrapeProductSpecs() {
    const specs = [];

    const techDetails = document.querySelectorAll('#productDetails_techSpec_section_1 tr, .prodDetTable tr');
    techDetails.forEach(row => {
      const label = row.querySelector('th');
      const value = row.querySelector('td');
      if (label && value) {
        specs.push(`${label.textContent.trim()}: ${value.textContent.trim()}`);
      }
    });

    const detailBullets = document.querySelectorAll('#detailBullets_feature_div li');
    detailBullets.forEach(bullet => {
      const text = bullet.textContent.trim();
      if (text && !text.includes('Best Sellers Rank')) {
        specs.push(text);
      }
    });

    return specs.join('\n');
  }

  function scrapeIngredientsOrMaterials() {
    const selectors = [
      '#important-information',
      '[data-feature-name="importantInformation"]',
      '.ingredients-section',
      '#ingredients',
      '.material-information'
    ];

    let ingredients = '';

    for (const selector of selectors) {
      const element = document.querySelector(selector);
      if (element) {
        ingredients += element.textContent.trim() + '\n';
      }
    }

    const description = document.querySelector('#productDescription');
    if (description) {
      const text = description.textContent;
      const ingredientMatch = text.match(/ingredients?:\s*([^\.]+)/i);
      if (ingredientMatch) {
        ingredients += ingredientMatch[1].trim();
      }
    }

    return ingredients;
  }

  async function scrapeReviews(retryCount = 0) {
    const reviews = [];

    const reviewSelectors = [
      '[data-hook="review"]',
      '.review',
      '#cm_cr-review_list [data-hook="review"]',
      '.a-section.review'
    ];

    let reviewElements = [];
    for (const selector of reviewSelectors) {
      reviewElements = document.querySelectorAll(selector);
      if (reviewElements.length > 0) break;
    }

    if (reviewElements.length === 0 && retryCount < CONFIG.maxRetries) {
      console.log(`[Amazon Analyzer] No reviews found, retry ${retryCount + 1}/${CONFIG.maxRetries}`);
      await sleep(CONFIG.retryDelay);
      return scrapeReviews(retryCount + 1);
    }

    let scrapedCount = 0;
    reviewElements.forEach(reviewEl => {
      if (scrapedCount >= CONFIG.maxReviewsToScrape) return;

      const reviewTextSelectors = [
        '[data-hook="review-body"]',
        '.review-text',
        '.review-text-content span'
      ];

      for (const selector of reviewTextSelectors) {
        const textElement = reviewEl.querySelector(selector);
        if (textElement) {
          const text = textElement.textContent.trim();
          if (text.length > 20) {
            reviews.push(text);
            scrapedCount++;
            break;
          }
        }
      }
    });

    console.log(`[Amazon Analyzer] Scraped ${reviews.length} reviews`);
    return reviews;
  }

  async function scrapeProductData() {
    console.log('[Amazon Analyzer] Starting product data scrape...');

    const productData = {
      asin: extractASIN(),
      title: scrapeProductTitle(),
      description: scrapeProductDescription(),
      specs: scrapeProductSpecs(),
      ingredients: scrapeIngredientsOrMaterials(),
      reviews: await scrapeReviews()
    };

    console.log('[Amazon Analyzer] Scrape complete:', {
      title: productData.title,
      descriptionLength: productData.description.length,
      specsLength: productData.specs.length,
      ingredientsLength: productData.ingredients.length,
      reviewCount: productData.reviews.length
    });

    return productData;
  }

  async function analyzeProduct(productData) {
    return new Promise((resolve, reject) => {
      chrome.runtime.sendMessage(
        {
          action: 'analyzeProduct',
          data: productData
        },
        response => {
          if (chrome.runtime.lastError) {
            reject(new Error(chrome.runtime.lastError.message));
          } else if (response.error) {
            reject(new Error(response.error));
          } else {
            resolve(response.analysis);
          }
        }
      );
    });
  }

  function createAnalysisCard() {
    const card = document.createElement('div');
    card.id = 'amazon-analyzer-card';
    card.className = 'analyzer-card';
    card.innerHTML = `
      <div class="analyzer-header">
        <h3 class="analyzer-title">🤖 AI Product Analysis</h3>
        <button class="analyzer-close" aria-label="Close">×</button>
      </div>
      <div class="analyzer-content">
        <div class="analyzer-loading">
          <div class="analyzer-spinner"></div>
          <p>Analyzing product reviews and details...</p>
        </div>
      </div>
    `;

    const closeBtn = card.querySelector('.analyzer-close');
    closeBtn.addEventListener('click', () => {
      card.remove();
      analysisCard = null;
    });

    return card;
  }

  function renderAnalysis(analysis) {
    const content = analysisCard.querySelector('.analyzer-content');
    let html = '';

    if (analysis.pros && analysis.pros.length > 0) {
      html += `
        <div class="analyzer-section">
          <h4 class="analyzer-section-title">👍 Pros from Reviews</h4>
          <ul class="analyzer-list pros-list">
            ${analysis.pros.map(pro => `
              <li class="analyzer-list-item">${escapeHtml(pro)}</li>
            `).join('')}
          </ul>
        </div>
      `;
    }

    if (analysis.cons && analysis.cons.length > 0) {
      html += `
        <div class="analyzer-section">
          <h4 class="analyzer-section-title">👎 Cons from Reviews</h4>
          <ul class="analyzer-list cons-list">
            ${analysis.cons.map(con => `
              <li class="analyzer-list-item">${escapeHtml(con)}</li>
            `).join('')}
          </ul>
        </div>
      `;
    }

    if (analysis.goodToKnow && analysis.goodToKnow.length > 0) {
      html += `
        <div class="analyzer-section">
          <h4 class="analyzer-section-title">ℹ️ Good To Know</h4>
          <ul class="analyzer-list info-list">
            ${analysis.goodToKnow.map(info => `
              <li class="analyzer-list-item">${escapeHtml(info)}</li>
            `).join('')}
          </ul>
        </div>
      `;
    }

    if (analysis.notableFeatures && analysis.notableFeatures.length > 0) {
      html += `
        <div class="analyzer-section">
          <h4 class="analyzer-section-title">⭐ Notable Features</h4>
          <div class="analyzer-features">
            ${analysis.notableFeatures.map(feature => 
              `<span class="analyzer-feature-tag">${escapeHtml(feature)}</span>`
            ).join('')}
          </div>
        </div>
      `;
    }

    if (!html) {
      html = `
        <div class="analyzer-error">
          <p>Unable to extract sufficient product information for analysis.</p>
          <p>This may be due to limited reviews or product data.</p>
        </div>
      `;
    }

    content.innerHTML = html;
  }

  function renderError(errorMessage) {
    const content = analysisCard.querySelector('.analyzer-content');
    content.innerHTML = `
      <div class="analyzer-error">
        <h4>⚠️ Analysis Failed</h4>
        <p>${escapeHtml(errorMessage)}</p>
        <button class="analyzer-retry" onclick="window.location.reload()">Retry</button>
      </div>
    `;
  }

  function findInsertionPoint() {
    const selectors = [
      '#reviewsMedley',
      '#cm_cr-review_list',
      '#customer-reviews_feature_div',
      '#detailBullets_feature_div',
      '#feature-bullets',
      '#productDescription',
      '#rightCol',
      '#centerCol'
    ];

    for (const selector of selectors) {
      const element = document.querySelector(selector);
      if (element) {
        return element;
      }
    }

    return null;
  }

  function injectAnalysisCard() {
    if (analysisCard) {
      console.log('[Amazon Analyzer] Card already exists, skipping injection');
      return;
    }

    const insertionPoint = findInsertionPoint();
    if (!insertionPoint) {
      console.warn('[Amazon Analyzer] Could not find suitable insertion point');
      return;
    }

    analysisCard = createAnalysisCard();
    insertionPoint.parentNode.insertBefore(analysisCard, insertionPoint);

    console.log('[Amazon Analyzer] Card injected successfully');
  }

  async function runAnalysis() {
    if (isAnalyzing) {
      console.log('[Amazon Analyzer] Analysis already in progress');
      return;
    }

    if (!isProductPage()) {
      console.log('[Amazon Analyzer] Not a product page, skipping');
      return;
    }

    isAnalyzing = true;

    try {
      await sleep(CONFIG.cardInsertionDelay);
      injectAnalysisCard();

      const productData = await scrapeProductData();

      if (productData.reviews.length < CONFIG.minReviewsForAnalysis) {
        renderError(`Limited review data (${productData.reviews.length} reviews found). Analysis requires at least ${CONFIG.minReviewsForAnalysis} reviews.`);
        isAnalyzing = false;
        return;
      }

      const analysis = await analyzeProduct(productData);
      renderAnalysis(analysis);

    } catch (error) {
      console.error('[Amazon Analyzer] Analysis failed:', error);
      if (analysisCard) {
        renderError(error.message || 'An unexpected error occurred');
      }
    } finally {
      isAnalyzing = false;
    }
  }

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  // Initialize
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', runAnalysis);
  } else {
    runAnalysis();
  }

  // Watch for URL changes (SPA navigation)
  let lastUrl = window.location.href;
  new MutationObserver(() => {
    const currentUrl = window.location.href;
    if (currentUrl !== lastUrl) {
      lastUrl = currentUrl;
      if (analysisCard) {
        analysisCard.remove();
      }
      analysisCard = null;
      isAnalyzing = false;
      runAnalysis();
    }
  }).observe(document.body, {
    childList: true,
    subtree: true
  });

  console.log('[Amazon Analyzer] Content script loaded successfully');
})();