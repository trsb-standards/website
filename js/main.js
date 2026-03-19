/* TRSB — main.js
   Nav shadow · Fade-in observer · Standards tabs · TOC highlight */

// Nav shadow on scroll
const nav = document.getElementById('sitenav');
if (nav) {
  window.addEventListener('scroll', () => {
    nav.style.boxShadow = scrollY > 40 ? '0 2px 20px rgba(13,26,43,0.12)' : '';
  });
}

// Fade-in on scroll — also fires immediately for already-visible elements
const obs = new IntersectionObserver(
  entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in'); }),
  { threshold: 0.01, rootMargin: '0px 0px -20px 0px' }
);
document.querySelectorAll('.fade').forEach(el => obs.observe(el));

// Hard fallback at 600ms — reveals everything regardless
setTimeout(() => {
  document.querySelectorAll('.fade').forEach(el => el.classList.add('in'));
}, 600);

// Standards tabs
function showTab(id, btn) {
  document.querySelectorAll('.std-panel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.std-tab').forEach(b => b.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  btn.classList.add('active');
}

// TOC highlight
const stdBlocks = document.querySelectorAll('.std-block[id]');
const tocLinks  = document.querySelectorAll('.std-toc a');
const tocObs = new IntersectionObserver(entries => entries.forEach(e => {
  if (e.isIntersecting) {
    tocLinks.forEach(l => l.classList.remove('active'));
    const a = document.querySelector('.std-toc a[href="#' + e.target.id + '"]');
    if (a) a.classList.add('active');
  }
}), { threshold: 0.3 });
stdBlocks.forEach(b => tocObs.observe(b));

// Cookie banner
(function() {
  if (localStorage.getItem('trsb_cookies_accepted')) return;
  const banner = document.getElementById('cookie-banner');
  if (!banner) return;
  banner.style.display = 'flex';
  document.getElementById('cookie-accept').addEventListener('click', () => {
    localStorage.setItem('trsb_cookies_accepted', '1');
    banner.style.display = 'none';
  });
  document.getElementById('cookie-decline').addEventListener('click', () => {
    localStorage.setItem('trsb_cookies_accepted', '0');
    banner.style.display = 'none';
  });
})();
