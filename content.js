(() => {
  'use strict';

  // A small, allow-listed set of common query field names. We intentionally do
  // not inspect arbitrary page inputs, preserving password and form privacy.
  const QUERY_NAMES = new Set(['q', 'query', 'search', 'p', 'text']);
  const processedFields = new WeakSet();

  /**
   * Reverse Unicode code points rather than UTF-16 units. This preserves emoji,
   * accented characters, and other surrogate pairs.
   * @param {string} value
   * @returns {string}
   */
  function reverseQuery(value) {
    return Array.from(value).reverse().join('');
  }

  /**
   * Finds the actual search field within a submitted form.
   * @param {HTMLFormElement} form
   * @returns {HTMLInputElement|HTMLTextAreaElement|null}
   */
  function findQueryField(form) {
    const fields = form.querySelectorAll('input[type="search"], input[type="text"], textarea');
    for (const field of fields) {
      const name = (field.name || '').toLowerCase();
      const ariaLabel = (field.getAttribute('aria-label') || '').toLowerCase();
      if (QUERY_NAMES.has(name) || /search/.test(ariaLabel)) {
        return field;
      }
    }
    return null;
  }

  /**
   * Checks a field without relying on a site's form structure. Google may
   * handle Enter in its own keyboard listener instead of dispatching submit.
   * @param {EventTarget|null} target
   * @returns {HTMLInputElement|HTMLTextAreaElement|null}
   */
  function asQueryField(target) {
    if (!(target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement)) {
      return null;
    }

    const name = (target.name || '').toLowerCase();
    const ariaLabel = (target.getAttribute('aria-label') || '').toLowerCase();
    return QUERY_NAMES.has(name) || /search/.test(ariaLabel) ? target : null;
  }

  function reverseField(field) {
    if (!field || processedFields.has(field) || !field.value) return;

    processedFields.add(field);
    field.value = reverseQuery(field.value);
    // Let framework-controlled search pages observe the revised value.
    field.dispatchEvent(new Event('input', { bubbles: true }));
    field.dispatchEvent(new Event('change', { bubbles: true }));
  }

  function reverseFormQuery(form) {
    if (!(form instanceof HTMLFormElement)) return;

    const field = findQueryField(form);
    reverseField(field);
  }

  // Capture phase means the value is changed before a page's submit listener
  // serializes it. We process just the submitted field, never keystrokes.
  document.addEventListener('submit', (event) => {
    reverseFormQuery(event.target);
  }, true);

  // Run in capture phase so the value is changed before an engine's Enter-key
  // handler serializes the search, even when no submit event is ever fired.
  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Enter' || event.isComposing) return;
    reverseField(asQueryField(event.target));
  }, true);

  // Some search pages submit by clicking a button rather than emitting a form
  // submit event. Limit this fallback to submit controls inside an actual form.
  document.addEventListener('click', (event) => {
    const target = event.target instanceof Element
      ? event.target.closest('button, input[type="submit"]')
      : null;
    const form = target && target.closest('form');
    if (form) reverseFormQuery(form);
  }, true);
})();
