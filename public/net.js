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
  if (typeof io === 'undefined' || !window.HORDA) return;

  const socket = io({ autoConnect: false });
  let timer = null;

  HORDA.onPlay(({ name, room, map, skin }) => {
    if (!room) return;
    socket.connect();
    socket.emit('sala:unirse', { room, name, skin, map });
    timer = setInterval(() => {
      if (HORDA.isPlaying()) socket.volatile.emit('jugador:estado', HORDA.getLocalState());
    }, 50);
    HORDA.setStatus(`Sala ${room}`);
  });

  // ★ Al entrar, dibuja a los que ya estaban (aunque estén quietos)
  socket.on('sala:bienvenida', ({ id, jugadores }) => {
    for (const [otroId, estado] of Object.entries(jugadores)) {
      if (otroId !== id && estado.x !== undefined) HORDA.upsertRemote(otroId, estado);
    }
  });

  socket.on('jugador:estado', ({ id, estado }) => HORDA.upsertRemote(id, estado));

  // ★ Cuando alguien se va, sácalo de la escena
  socket.on('jugador:salio', ({ id }) => HORDA.removeRemote(id));

  // ★ Al volver al menú: dejar de enviar y desconectarse
  HORDA.onMenu(() => {
    clearInterval(timer);
    socket.disconnect();
    HORDA.clearRemotes();
    HORDA.setStatus('');
  });
})();
