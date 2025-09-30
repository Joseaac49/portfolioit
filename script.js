// ---------- util ----------
function $(sel, root = document) { return root.querySelector(sel); }
function el(html) { const t = document.createElement('template'); t.innerHTML = html.trim(); return t.content.firstElementChild; }

// ---------- data: tus proyectos ----------
const projects = [
  {
    title: 'Clock Weather',
    stack: 'React + Vite · Express · Azure · GitHub Actions',
    bullets: [
      'Reloj en vivo + clima actual',
      'Autocomplete de ciudades (Open-Meteo)',
      'UI centrada y responsive (card “glass”)'
    ],
    demo: 'https://joseaac49.github.io/clock-weather/',
    repo: 'https://github.com/Joseaac49/clock-weather',
    // opcional: screenshot local. Si lo agregás, descomenta la línea y poné el archivo en assets/
    // cover: 'assets/clock-weather-cover.png'
  },
  // Podés agregar más proyectos acá
];

// ---------- render ----------
function renderProjects() {
  const grid = $('#projectGrid');
  grid.innerHTML = '';
  projects.forEach(p => {
    const card = el(`
      <article class="project-card">
        ${p.cover ? `<img class="project-cover" alt="${p.title}" src="${p.cover}">` : ''}
        <div class="project-body">
          <h3 class="project-title">${p.title}</h3>
          <p class="project-stack">${p.stack}</p>
          <ul class="project-list">
            ${p.bullets.map(b => `<li>${b}</li>`).join('')}
          </ul>
          <div class="project-actions">
            <a class="btn" target="_blank" rel="noreferrer" href="${p.demo}">🔗 Demo</a>
            <a class="btn btn-ghost" target="_blank" rel="noreferrer" href="${p.repo}">📦 Código</a>
          </div>
        </div>
      </article>
    `);
    grid.appendChild(card);
  });
}

// ---------- nav móvil ----------
function setupNav() {
  const btn = $('.nav-toggle');
  const links = $('.nav-links');
  if (!btn || !links) return;
  btn.addEventListener('click', () => links.classList.toggle('open'));
  links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => links.classList.remove('open')));
}

// ---------- tema (oscuro/claro) ----------
function setupTheme() {
  const btn = $('#themeToggle');
  const saved = localStorage.getItem('theme') || 'dark';
  document.documentElement.dataset.theme = saved;
  btn?.addEventListener('click', () => {
    const next = (document.documentElement.dataset.theme === 'dark') ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    localStorage.setItem('theme', next);
  });
}

// ---------- año en footer ----------
function setYear() { const y = $('#year'); if (y) y.textContent = new Date().getFullYear(); }

// ---------- smooth scroll (ancoras) ----------
function setupSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href').slice(1);
      const target = document.getElementById(id);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

// ---------- init ----------
document.addEventListener('DOMContentLoaded', () => {
  renderProjects();
  setupNav();
  setupTheme();
  setYear();
  setupSmoothScroll();
});
