# Castasound SPA

El sitio ha sido reestructurado como una aplicación de una sola página (SPA). Las páginas originales ahora se cargan dinámicamente desde la carpeta `views` mediante un router básico escrito en JavaScript.

Los estilos y scripts definidos en cada vista se inyectan automáticamente al navegar, por lo que cada sección mantiene su apariencia y funcionalidad originales.

Antes de cargar una nueva vista, el router ejecuta una función global `window.currentCleanup` si existe; así cada sección puede liberar temporizadores o escuchas que ya no necesite.

La navegación se realiza mediante un menú lateral flotante que se desliza sobre el contenido sin desplazarlo.

## Uso
Solo abre `index.html` en tu navegador. Navega entre secciones utilizando el menú lateral o las rutas con hash:
- `#/` inicio
- `#/game` juego de asesino
- `#/horario` timeline de actividades
- `#/lote` subasta de lotes
