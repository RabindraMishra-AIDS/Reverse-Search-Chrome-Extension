/* global chrome */
'use strict';

const form = document.querySelector('#search-form');
const query = document.querySelector('#query');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const value = query.value.trim();
  if (!value) {
    query.focus();
    return;
  }

  chrome.runtime.sendMessage({ type: 'reverse-search', query: value });
  window.close();
});
