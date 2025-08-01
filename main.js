const routes = {
  '/': 'views/home.html',
  '/game': 'views/game.html',
  '/horario': 'views/horario.html',
  '/lote': 'views/lote.html'
};

async function loadRoute() {
  const path = location.hash.slice(1) || '/';
  const route = routes[path] || routes['/'];
  // limpia los estilos y scripts previamente inyectados
  document.querySelectorAll('[data-router]').forEach(el => el.remove());

  const res = await fetch(route);
  const html = await res.text();
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  const app = document.getElementById('app');

  // carga el contenido principal de la vista
  app.innerHTML = doc.body ? doc.body.innerHTML : html;

  // inyecta estilos de la vista
  if (doc.head) {
    doc.head
      .querySelectorAll('link[rel="stylesheet"], style')
      .forEach(el => {
        const styleEl = el.cloneNode(true);
        styleEl.setAttribute('data-router', '');
        document.head.appendChild(styleEl);
      });
  }

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
}

window.addEventListener('hashchange', loadRoute);
window.addEventListener('DOMContentLoaded', loadRoute);
