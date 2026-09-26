// Código de red del cliente. Etapa 1 — guía en docs/etapa-1.md
//
// El juego (index.html) te da window.HORDA:
//   HORDA.onPlay(fn)            fn({ name, room, map, skin }) al pulsar Jugar. room === '' → un jugador.
//   HORDA.onMenu(fn)            fn() al volver al menú.
//   HORDA.getLocalState()       { x, y, z, yaw, pitch, skin, weapon, name, map, hp }
//   HORDA.upsertRemote(id, st)  crea o mueve a otro jugador (acepta lo que devuelve getLocalState).
//   HORDA.removeRemote(id)      lo quita de la escena.
//   HORDA.clearRemotes()        quita a todos.
//   HORDA.setStatus(texto)      texto azul bajo el marcador.
//   HORDA.isPlaying()           true si estás en partida (o en pausa).

(() => {
  // Si abres index.html sin el servidor, `io` no existe: el juego sigue en modo un jugador.
  if (typeof io === 'undefined' || !window.HORDA) return;

  const socket = io({ autoConnect: false });

  HORDA.onPlay(({ name, room, map, skin }) => {
    if (!room) return; // un jugador
    // TODO A: conéctate y pide entrar a la sala.
    // TODO B: cada ~50 ms manda tu estado. (¿Qué pasa si lo mandas en cada frame?)
  });

  // TODO C: 'sala:bienvenida' → dibuja a los que ya estaban.
  // TODO D: 'jugador:estado'  → HORDA.upsertRemote(...)
  // TODO E: 'jugador:salio'   → HORDA.removeRemote(...)

  HORDA.onMenu(() => {
    // TODO F: deja de mandar estado, desconéctate y limpia a los demás.
  });
})();
