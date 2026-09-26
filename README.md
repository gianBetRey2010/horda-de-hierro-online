# Horda de Hierro · online

Shooter de bloques en primera persona, estilo Counter, contra hordas de zombies. Tres mapas (de_ciudadela, de_puerto, de_refugio), dos personajes, cinco armas y cuatro tipos de enemigos. Este repositorio lo convierte en multijugador por salas con Node.js y Socket.IO.

## Correrlo

Necesitas [Node.js](https://nodejs.org) 18 o superior.

```bash
npm install
npm run dev
```

Abre `http://localhost:3000`. Si dejas vacío el código de sala, juegas solo como siempre.

## Estructura

```
server/index.js    servidor: Express sirve /public y Socket.IO maneja las salas
public/index.html  el juego (Three.js); expone window.HORDA para la red
public/net.js      el cliente de red: conecta el juego con el servidor
docs/              guía de cada etapa y diagramas
```

## Hoja de ruta

| Etapa | Qué se logra | Estado |
|---|---|---|
| 0 | Proyecto, servidor que sirve el juego, API `window.HORDA` | Hecha |
| 1 | Salas por código y ver a los demás moverse ([guía](docs/etapa-1.md)) | En curso |
| 2 | Modo **todos contra todos**: el servidor valida disparos, vida, muertes y marcador | Pendiente |
| 3 | Modo **cooperativo**: el servidor simula zombies, rondas y objetos del mapa para todos | Pendiente |
| 4 | Elegir modo al crear la sala y publicarlo en internet (Render o Fly.io) | Pendiente |

## Controles

WASD moverse · Espacio saltar · Shift caminar · clic izquierdo disparar · clic derecho culatazo/estocada · 1–5, rueda o Q cambiar arma · R recargar · V primera/tercera persona · Esc pausa.
