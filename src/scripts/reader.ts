// Reading progress line, active nav highlighting, "Next section" control, and image reveal.
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const progress = document.querySelector<HTMLElement>('.progress span');
const nav = document.querySelector<HTMLElement>('.masthead nav');
const navLinks = Array.from(document.querySelectorAll<HTMLAnchorElement>('.masthead nav a[href^="#"]'));
const sections = Array.from(document.querySelectorAll<HTMLElement>('[data-section]'));
const next = document.querySelector<HTMLButtonElement>('.next-section');
const menuButton = document.querySelector<HTMLButtonElement>('.menu-button');

function updateProgress() {
  if (!progress) return;
  const doc = document.documentElement;
  const max = doc.scrollHeight - window.innerHeight;
  progress.style.width = max > 0 ? `${Math.min(100, (window.scrollY / max) * 100)}%` : '0%';
}

function currentIndex(): number {
  const line = window.scrollY + window.innerHeight * 0.35;
  let idx = -1;
  sections.forEach((s, i) => { if (s.offsetTop <= line) idx = i; });
  return idx;
}

function updateActive() {
  const idx = currentIndex();
  const id = idx >= 0 ? sections[idx].id : '';
  navLinks.forEach((a) => a.classList.toggle('is-active', a.getAttribute('href') === `#${id}`));
  if (next) {
    const hasNext = idx < sections.length - 1 && window.scrollY > window.innerHeight * 0.5;
    next.classList.toggle('is-visible', hasNext);
  }
}

let ticking = false;
window.addEventListener('scroll', () => {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(() => { updateProgress(); updateActive(); ticking = false; });
}, { passive: true });
window.addEventListener('resize', () => { updateProgress(); updateActive(); });
updateProgress();
updateActive();

next?.addEventListener('click', () => {
  const idx = currentIndex();
  const target = sections[Math.min(idx + 1, sections.length - 1)];
  target?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
});

menuButton?.addEventListener('click', () => {
  const open = nav?.classList.toggle('is-open') ?? false;
  menuButton.setAttribute('aria-expanded', String(open));
});
navLinks.forEach((a) => a.addEventListener('click', () => {
  nav?.classList.remove('is-open');
  menuButton?.setAttribute('aria-expanded', 'false');
}));

const reveals = document.querySelectorAll<HTMLElement>('.reveal');
if (reduceMotion || !('IntersectionObserver' in window)) {
  reveals.forEach((el) => el.classList.add('is-visible'));
} else {
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (e.isIntersecting) { e.target.classList.add('is-visible'); io.unobserve(e.target); }
    }
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });
  reveals.forEach((el) => io.observe(el));
}
