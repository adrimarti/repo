const routes = {
  '/': 'views/home.html',
  '/game': 'views/game.html',
  '/horario': 'views/horario.html',
  '/lote': 'views/lote.html'
};

async function loadRoute() {
  const path = location.hash.slice(1) || '/';
  const route = routes[path] || routes['/'];
  const res = await fetch(route);
  const html = await res.text();
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  const content = doc.body ? doc.body.innerHTML : html;
  const app = document.getElementById('app');
  app.innerHTML = content;
  app.querySelectorAll('script').forEach(oldScript => {
    const newScript = document.createElement('script');
    for (const attr of oldScript.attributes) {
      newScript.setAttribute(attr.name, attr.value);
    }
    newScript.appendChild(document.createTextNode(oldScript.innerHTML));
    document.body.appendChild(newScript);
    oldScript.remove();
  });
}

window.addEventListener('hashchange', loadRoute);
window.addEventListener('DOMContentLoaded', loadRoute);
