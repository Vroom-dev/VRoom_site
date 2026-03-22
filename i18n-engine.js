/**
 * VRoom i18n Engine — zero dependencies, no build tools required.
 *
 * Contract:
 *   - VROOM_I18N (or window.VROOM_I18N) must be defined before this script runs.
 *     Shape: { it: { [key]: string, _meta: { title, description, ... } }, en: { ... } }
 *   - Elements that need translation carry data-i18n="key"        → innerHTML replaced.
 *   - Input/textarea elements carry data-i18n-placeholder="key"   → placeholder attribute set.
 *   - Meta tags are updated automatically from the _meta object in the dictionary.
 *
 * Exposed globals:
 *   switchLang(lang)  — programmatic language switch (also callable from console).
 */
(function () {
  'use strict';

  /* ── Constants ──────────────────────────────────────────────────────── */
  var STORAGE_KEY  = 'vroom-lang';
  var SUPPORTED    = ['it', 'en'];
  var DEFAULT_LANG = 'it';

  /* ── Resolve the dictionary ─────────────────────────────────────────── */
  /**
   * Returns the VROOM_I18N object, accepting both window.VROOM_I18N and a
   * plain var VROOM_I18N declared in the same scope (strings.js style).
   * @returns {Object|null}
   */
  function getDict() {
    /* window.VROOM_I18N covers both explicit window assignment and any var
       declared at global scope in non-strict mode. */
    if (typeof window.VROOM_I18N !== 'undefined') return window.VROOM_I18N;
    /* Fallback: bare identifier (same-scope globals in some bundlers). */
    if (typeof VROOM_I18N !== 'undefined') return VROOM_I18N; // eslint-disable-line no-undef
    return null;
  }

  /* ── Resolve initial language ───────────────────────────────────────── */
  /**
   * Priority: localStorage → browser language → DEFAULT_LANG.
   * @returns {'it'|'en'}
   */
  function resolveInitialLang() {
    /* 1. Stored user preference. */
    try {
      var stored = localStorage.getItem(STORAGE_KEY);
      if (stored && SUPPORTED.indexOf(stored) !== -1) return stored;
    } catch (_) { /* localStorage blocked (private browsing, etc.) — ignore. */ }

    /* 2. Browser language. */
    var nav = (navigator.language || navigator.userLanguage || '').toLowerCase();
    if (nav.indexOf('en') === 0) return 'en';

    /* 3. Project default. */
    return DEFAULT_LANG;
  }

  /* ── Meta helper ────────────────────────────────────────────────────── */
  /**
   * Sets the content attribute on a <meta> element.
   * @param {string} attrName  — 'name' or 'property'
   * @param {string} attrValue — the meta selector value
   * @param {string} [content] — new content string (skipped if falsy)
   */
  function setMeta(attrName, attrValue, content) {
    if (!content) return;
    var el = document.querySelector('meta[' + attrName + '="' + attrValue + '"]');
    if (el) el.setAttribute('content', content);
  }

  /* ── Core translation function ──────────────────────────────────────── */
  /**
   * Applies all translations for the given language to the live DOM.
   * Single pass — suitable for static/SSR pages without MutationObserver.
   * Missing keys are silently skipped; original HTML is preserved.
   * @param {string} lang
   */
  function applyLang(lang) {
    /* Always set <html lang> regardless of whether the dictionary loaded. */
    document.documentElement.lang = lang;

    var i18n = getDict();
    if (!i18n) {
      console.warn('[VRoom i18n] VROOM_I18N not found — did you load i18n-strings.js first?');
      return;
    }

    var dict = i18n[lang];
    if (!dict) {
      console.warn('[VRoom i18n] No dictionary for lang "' + lang + '".');
      return;
    }

    var i, el, key;

    /* ── data-i18n → innerHTML ── */
    var elements = document.querySelectorAll('[data-i18n]');
    for (i = 0; i < elements.length; i++) {
      el  = elements[i];
      key = el.getAttribute('data-i18n');
      if (Object.prototype.hasOwnProperty.call(dict, key)) {
        el.innerHTML = dict[key];
      }
      /* Key absent → keep original HTML as fallback. */
    }

    /* ── data-i18n-placeholder → placeholder attribute ── */
    var inputs = document.querySelectorAll('[data-i18n-placeholder]');
    for (i = 0; i < inputs.length; i++) {
      el  = inputs[i];
      key = el.getAttribute('data-i18n-placeholder');
      if (Object.prototype.hasOwnProperty.call(dict, key)) {
        el.placeholder = dict[key];
      }
    }

    /* ── data-i18n-content → content attribute (for <meta> or similar) ── */
    var metaEls = document.querySelectorAll('[data-i18n-content]');
    for (i = 0; i < metaEls.length; i++) {
      el  = metaEls[i];
      key = el.getAttribute('data-i18n-content');
      if (Object.prototype.hasOwnProperty.call(dict, key)) {
        el.setAttribute('content', dict[key]);
      }
    }

    /* ── Special _meta object → document.title + <meta> tags ── */
    var meta = dict['_meta'];
    if (meta) {
      if (meta.title)           { document.title = meta.title; }
      setMeta('name',     'description',       meta.description);
      setMeta('property', 'og:title',          meta.og_title);
      setMeta('property', 'og:description',    meta.og_description);
      setMeta('name',     'twitter:title',     meta.twitter_title);
      setMeta('name',     'twitter:description', meta.twitter_desc);
    }

    /* ── Update lang-btn active state + aria-pressed ── */
    var buttons = document.querySelectorAll('.lang-btn');
    for (i = 0; i < buttons.length; i++) {
      var btn      = buttons[i];
      var isActive = btn.getAttribute('data-lang') === lang;
      if (isActive) {
        btn.classList.add('active');
        btn.setAttribute('aria-pressed', 'true');
      } else {
        btn.classList.remove('active');
        btn.setAttribute('aria-pressed', 'false');
      }
    }
  }

  /* ── Public API ─────────────────────────────────────────────────────── */
  /**
   * Switch the site language, persist to localStorage, and re-render all
   * translated elements. Safe to call from the browser console.
   * @param {'it'|'en'} lang
   */
  window.switchLang = function (lang) {
    if (SUPPORTED.indexOf(lang) === -1) {
      console.warn('[VRoom i18n] Unsupported lang "' + lang + '". Supported: ' + SUPPORTED.join(', '));
      return;
    }
    try { localStorage.setItem(STORAGE_KEY, lang); } catch (_) { /* ignore */ }
    applyLang(lang);
  };

  /* ── Wire toggle buttons ────────────────────────────────────────────── */
  /**
   * Attaches click handlers to .lang-btn elements.
   * Uses event delegation so buttons added after this call also work.
   */
  function wireToggle() {
    var buttons = document.querySelectorAll('.lang-btn');
    for (var i = 0; i < buttons.length; i++) {
      (function (btn) {
        btn.addEventListener('click', function () {
          window.switchLang(btn.getAttribute('data-lang'));
        });
      })(buttons[i]);
    }
  }

  /* ── Bootstrap ──────────────────────────────────────────────────────── */
  var initialLang = resolveInitialLang();

  if (document.readyState === 'loading') {
    /*
     * Set <html lang> immediately — before body is parsed — to avoid a flash
     * of the wrong language. Full DOM pass runs on DOMContentLoaded.
     */
    document.documentElement.lang = initialLang;

    document.addEventListener('DOMContentLoaded', function () {
      applyLang(initialLang);
      wireToggle();
    });
  } else {
    /* Script loaded with defer/async or placed at end of body — DOM ready. */
    applyLang(initialLang);
    wireToggle();
  }

})();
