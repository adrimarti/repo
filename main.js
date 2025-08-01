const routes = {
  '/': 'views/home.html',
  '/asesino': 'views/asesino.html',
  '/horario': 'views/horario.html'
};

async function loadRoute() {
  // permite que cada vista ejecute su propia limpieza
  if (window.currentCleanup) {
    try {
      window.currentCleanup();
    } catch (err) {
      console.error(err);
    }
    window.currentCleanup = null;
  }

  const sideMenu = document.getElementById('side-menu');
  const menuBtn = document.getElementById('menu-toggle');
  sideMenu.classList.remove('open');
  menuBtn.classList.remove('open');
  menuBtn.textContent = '☰';
  const path = location.hash.slice(1) || '/';
  const route = routes[path] || routes['/'];
  const app = document.getElementById('app');
  app.style.visibility = 'hidden';

  // limpia los estilos y scripts previamente inyectados
  document.querySelectorAll('[data-router]').forEach(el => el.remove());

  const res = await fetch(route);
  const html = await res.text();
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');

  // inyecta estilos de la vista y espera a que carguen
  const stylePromises = [];
  if (doc.head) {
    doc.head
      .querySelectorAll('link[rel="stylesheet"], style')
      .forEach(el => {
        const styleEl = el.cloneNode(true);
        styleEl.setAttribute('data-router', '');
        const p = new Promise(resolve => {
          if (styleEl.tagName === 'LINK') {
            styleEl.addEventListener('load', resolve, { once: true });
            styleEl.addEventListener('error', resolve, { once: true });
          } else {
            resolve();
          }
        });
        stylePromises.push(p);
        document.head.appendChild(styleEl);
      });
  }

  // carga el contenido principal de la vista
  app.innerHTML = doc.body ? doc.body.innerHTML : html;

  // ejecuta scripts de la vista
  const scripts = [
    ...(doc.head ? [...doc.head.querySelectorAll('script')] : []),
    ...app.querySelectorAll('script')
  ];
  scripts.forEach(oldScript => {
    const newScript = document.createElement('script');
    for (const attr of oldScript.attributes) {
      newScript.setAttribute(attr.name, attr.value);
    }
    newScript.setAttribute('data-router', '');
    if (oldScript.textContent) {
      newScript.append(oldScript.textContent);
    }
    document.body.appendChild(newScript);
    oldScript.remove();
  });

  await Promise.all(stylePromises);
  requestAnimationFrame(() => {
    app.style.visibility = '';
  });
}

window.addEventListener('hashchange', loadRoute);
window.addEventListener('DOMContentLoaded', () => {
  const menuBtn = document.getElementById('menu-toggle');
  const sideMenu = document.getElementById('side-menu');
  menuBtn.addEventListener('click', () => {
    sideMenu.classList.toggle('open');
    menuBtn.classList.toggle('open');
    menuBtn.textContent = sideMenu.classList.contains('open') ? '✕' : '☰';
  });
  sideMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      sideMenu.classList.remove('open');
      menuBtn.classList.remove('open');
      menuBtn.textContent = '☰';
    });
  });
  loadRoute();
});
