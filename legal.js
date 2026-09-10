// Shared behavior for the legal pages. Each page defines window.PAGE = { titles, descs } first.
'use strict';
(function () {
  const root = document.documentElement;
  const themeMeta = document.querySelector('meta[name="theme-color"]');
  const descMeta = document.querySelector('meta[name="description"]');
  // Mirrors the two --bg tokens in legal.css; a lookup avoids a forced style recalc.
  const BG = { dark: '#0A1128', light: '#FAF7F0' };
  const ARIA = {
    theme: { en: 'Toggle dark or light mode', ar: 'التبديل بين الوضع الداكن والفاتح' },
    lang: { en: 'Switch language to Arabic', ar: 'تغيير اللغة إلى الإنجليزية' },
    mainNav: { en: 'Main', ar: 'رئيسي' },
    legalNav: { en: 'Legal', ar: 'قانوني' }
  };

  function applyLang(lang, persist) {
    root.lang = lang;
    root.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.title = PAGE.titles[lang];
    descMeta.setAttribute('content', PAGE.descs[lang]);
    document.getElementById('theme-toggle').setAttribute('aria-label', ARIA.theme[lang]);
    document.getElementById('lang-toggle').setAttribute('aria-label', ARIA.lang[lang]);
    document.querySelector('nav.nav').setAttribute('aria-label', ARIA.mainNav[lang]);
    document.querySelector('footer .legal').setAttribute('aria-label', ARIA.legalNav[lang]);
    if (persist) { try { localStorage.setItem('sihaab-lang', lang); } catch (e) {} }
  }
  function applyTheme(theme, persist) {
    root.dataset.theme = theme;
    themeMeta.setAttribute('content', BG[theme]);
    if (persist) { try { localStorage.setItem('sihaab-theme', theme); } catch (e) {} }
  }

  if (root.lang === 'ar') applyLang('ar', false); // English is the static markup default
  document.getElementById('lang-toggle').addEventListener('click', () => {
    applyLang(root.lang === 'ar' ? 'en' : 'ar', true);
  });
  document.getElementById('theme-toggle').addEventListener('click', () => {
    applyTheme(root.dataset.theme === 'light' ? 'dark' : 'light', true);
  });
})();
