// popup.js - Settings popup script

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('settingsForm');
  const apiKeyInput = document.getElementById('apiKey');
  const saveBtn = document.getElementById('saveBtn');
  const statusDiv = document.getElementById('status');
  const togglePasswordBtn = document.getElementById('togglePassword');

  // Load existing API key
  loadApiKey();

  // Toggle password visibility
  togglePasswordBtn.addEventListener('click', () => {
    if (apiKeyInput.type === 'password') {
      apiKeyInput.type = 'text';
      togglePasswordBtn.textContent = 'Hide';
    } else {
      apiKeyInput.type = 'password';
      togglePasswordBtn.textContent = 'Show';
    }
  });

  // Handle form submission
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    saveApiKey();
  });

  function loadApiKey() {
    chrome.runtime.sendMessage({ action: 'getApiKey' }, (response) => {
      if (response && response.apiKey) {
        apiKeyInput.value = response.apiKey;
        showStatus('API key loaded', 'success');
      }
    });
  }

  function saveApiKey() {
    const apiKey = apiKeyInput.value.trim();

    if (!apiKey) {
      showStatus('Please enter an API key', 'error');
      return;
    }

    // Basic validation for Gemini API key format
    if (!apiKey.startsWith('AIza')) {
      showStatus('Invalid API key format. Gemini API keys start with "AIza"', 'error');
      return;
    }

    saveBtn.disabled = true;
    saveBtn.textContent = 'Saving...';

    chrome.runtime.sendMessage(
      {
        action: 'saveApiKey',
        apiKey: apiKey
      },
      (response) => {
        saveBtn.disabled = false;
        saveBtn.textContent = 'Save API Key';

        if (response && response.success) {
          showStatus('✓ API key saved successfully!', 'success');
          
          // Auto-close popup after 1.5 seconds
          setTimeout(() => {
            window.close();
          }, 1500);
        } else {
          showStatus('Failed to save API key', 'error');
        }
      }
    );
  }

  function showStatus(message, type) {
    statusDiv.textContent = message;
    statusDiv.className = `status ${type}`;
    statusDiv.style.display = 'block';

    if (type === 'error') {
      setTimeout(() => {
        statusDiv.style.display = 'none';
      }, 5000);
    }
  }
});