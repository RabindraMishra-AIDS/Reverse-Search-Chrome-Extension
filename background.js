/* global chrome */
'use strict';

function reverseText(value) {
  return Array.from(value).reverse().join('');
}

function searchUrl(query) {
  return `https://www.google.com/search?q=${encodeURIComponent(reverseText(query))}`;
}

function openSearch(query, disposition = 'currentTab') {
  const normalizedQuery = query.trim();
  if (!normalizedQuery) return;

  const url = searchUrl(normalizedQuery);
  if (disposition === 'newBackgroundTab' || disposition === 'newForegroundTab') {
    chrome.tabs.create({ url, active: disposition === 'newForegroundTab' });
    return;
  }

  // Without a tab id, Chrome updates the currently selected tab. This avoids
  // requesting the broad "tabs" permission simply to learn its identifier.
  chrome.tabs.update({ url }).catch(() => chrome.tabs.create({ url }));
}

chrome.omnibox.onInputStarted.addListener(() => {
  chrome.omnibox.setDefaultSuggestion({
    description: 'Search with Reverse Search: your query will be reversed.'
  });
});

chrome.omnibox.onInputEntered.addListener((text, disposition) => {
  openSearch(text, disposition);
});

chrome.runtime.onMessage.addListener((message) => {
  if (message?.type === 'reverse-search' && typeof message.query === 'string') {
    openSearch(message.query, 'newForegroundTab');
  }
});
