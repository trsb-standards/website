/* Loads shared nav.html and footer.html into every page.*/

(function () {
  const base = window.TRSB_BASE || '';

  function load(url, targetId, callback) {
    fetch(url)
      .then(r => {
        if (!r.ok) throw new Error('Failed to load ' + url);
        return r.text();
      })
      .then(html => {
        const el = document.getElementById(targetId);
        if (el) {
          el.outerHTML = html;
          if (callback) callback();
        }
      })
      .catch(err => console.warn('TRSB includes:', err));
  }

  // Mark active nav link based on current page / hash
  function markActive() {
    const path = window.location.pathname;
    const hash = window.location.hash;
    document.querySelectorAll('#sitenav .nav-links a, #nav-drawer a').forEach(a => {
      const href = a.getAttribute('href') || '';
      // Active if hash matches or it's the index and we're on index
      if (hash && href === hash) {
        a.classList.add('nav-active');
      } else if (!hash && (href === 'index.html' || href === './')) {
        a.classList.add('nav-active');
      }
    });
  }

  // Fix relative paths for legal pages (privacy.html, terms.html, cookies.html)
  // These are at root level so paths are identical — no adjustment needed.
  // If you add pages in subdirectories, set window.TRSB_BASE = '../' before
  // loading this script to prefix all src/href attributes automatically.
  function fixPaths(base) {
    if (!base) return;
    document.querySelectorAll(
      '#sitenav img[src], #sitenav a[href], footer img[src], footer a[href]'
    ).forEach(el => {
      const attr = el.tagName === 'IMG' ? 'src' : 'href';
      const val = el.getAttribute(attr);
      if (val && !val.startsWith('http') && !val.startsWith('#') && !val.startsWith('mailto')) {
        el.setAttribute(attr, base + val);
      }
    });
  }

  load(base + 'nav.html',    'site-nav',    () => { markActive(); fixPaths(base); });
  load(base + 'footer.html', 'site-footer', () => { fixPaths(base); });
})();
