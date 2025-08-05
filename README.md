# Castasound SPA

El sitio ha sido reestructurado como una aplicación de una sola página (SPA). Las páginas originales ahora se cargan dinámicamente desde la carpeta `views` mediante un router básico escrito en JavaScript.

Los estilos y scripts definidos en cada vista se inyectan automáticamente al navegar, por lo que cada sección mantiene su apariencia y funcionalidad originales.
Durante la transición, el contenedor principal permanece oculto hasta que los estilos de la vista han cargado para evitar parpadeos sin formato.

Antes de cargar una nueva vista, el router ejecuta una función global `window.currentCleanup` si existe; así cada sección puede liberar temporizadores o escuchas que ya no necesite.

La navegación se realiza mediante un menú lateral flotante que se desliza sobre el contenido sin desplazarlo.

## Uso
Solo abre `index.html` en tu navegador. Navega entre secciones utilizando el menú lateral o las rutas con hash:
- `#/` inicio
- `#/asesino` asesino
- `#/horario` timeline de actividades
- próximamente más misterios

## Carrera de camellos
El minijuego de camellos ahora es más impredecible: cada camello puede avanzar o retroceder de forma torpe antes de llegar a la meta, y a veces uno recibe una ventaja o desventaja para que ningún color domine siempre.
