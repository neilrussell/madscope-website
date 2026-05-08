// Nav: mobile toggle + dropdown
const nav = document.querySelector('.nav');
const navToggle = document.querySelector('.nav-toggle');
const navDropdown = document.querySelector('.nav-dropdown');

if (navToggle) {
  navToggle.addEventListener('click', () => nav.classList.toggle('open'));
}

if (navDropdown) {
  navDropdown.querySelector('.nav-dropdown-toggle').addEventListener('click', () => {
    navDropdown.classList.toggle('open');
  });
  document.addEventListener('click', e => {
    if (!navDropdown.contains(e.target)) navDropdown.classList.remove('open');
  });
}

// Fade-up on scroll
const fadeEls = document.querySelectorAll('.fade-up');
if (fadeEls.length) {
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } });
  }, { threshold: 0.1 });
  fadeEls.forEach(el => io.observe(el));
}

// FAQ accordion
document.querySelectorAll('.faq-q').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.faq-item');
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
  });
});

// Close mobile nav on link click
document.querySelectorAll('.nav.open .nav-links a').forEach(a => {
  a.addEventListener('click', () => nav.classList.remove('open'));
});

// Lightbox for testimonial images
(function () {
  const overlay = document.createElement('div');
  overlay.className = 'lightbox-overlay';
  const img = document.createElement('img');
  const btn = document.createElement('button');
  btn.className = 'lightbox-close';
  btn.setAttribute('aria-label', 'Close');
  btn.textContent = '×';
  overlay.appendChild(img);
  overlay.appendChild(btn);
  overlay.style.display = 'none';
  document.body.appendChild(overlay);

  function open(src) {
    img.src = src;
    overlay.style.display = 'flex';
    requestAnimationFrame(() => overlay.classList.add('visible'));
    document.body.style.overflow = 'hidden';
  }

  function close() {
    overlay.classList.remove('visible');
    setTimeout(() => { overlay.style.display = 'none'; img.src = ''; }, 200);
    document.body.style.overflow = '';
  }

  document.querySelectorAll('.screenshots-inner img, .testimonial-gallery img').forEach(el => {
    el.addEventListener('click', () => open(el.src));
  });

  btn.addEventListener('click', close);
  overlay.addEventListener('click', e => { if (e.target === overlay) close(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && overlay.classList.contains('visible')) close(); });
})();
