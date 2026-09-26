// Servidor de Horda de Hierro.
// Etapa 0 (lista): sirve el juego desde /public y acepta conexiones de Socket.IO.
// Etapa 1 (tuya):  salas y sincronizar jugadores. Guía: docs/etapa-1.md

import express from 'express';
import { createServer } from 'node:http';
import { Server } from 'socket.io';
import { fileURLToPath } from 'node:url';

const app = express();
const http = createServer(app);
const io = new Server(http);

// Todo lo que está en /public se sirve tal cual (index.html, net.js…).
// Socket.IO además sirve su cliente en /socket.io/socket.io.js
app.use(express.static(fileURLToPath(new URL('../public', import.meta.url))));

// ---------------------------------------------------------------------------
// ETAPA 1 — Estado de las salas
// Piensa qué estructura te conviene. Pregunta guía: dado el código de una sala,
// ¿cómo obtengo rápido a todos sus jugadores y el último estado de cada uno?
// const salas = ...
// ---------------------------------------------------------------------------
const salas = new Map();
io.on('connection', (socket) => {
  console.log(`[+] conectado ${socket.id}`);
  let sala = null;

  socket.on('sala:unirse', ({ room, name, skin, map }) => {
    sala = room;
    socket.join(sala);
    if (!salas.has(sala)) salas.set(sala, new Map());
    salas.get(sala).set(socket.id, { name, skin, map });
    socket.emit('sala:bienvenida', { id: socket.id, jugadores: Object.fromEntries(salas.get(sala)) });
    console.log(`${name} entró a la sala ${sala}`);
  });

  socket.on('jugador:estado', (estado) => {
    if (!sala) return;
    salas.get(sala).set(socket.id, estado);
    socket.to(sala).emit('jugador:estado', { id: socket.id, estado });
  });
  // TODO 1: 'sala:unirse'  → valida el código, mete el socket en la sala
  //         (socket.join) y respóndele SOLO a él con 'sala:bienvenida'.

  // TODO 2: 'jugador:estado' → guarda el estado y reenvíalo a los DEMÁS
  //         de su sala (no a él mismo).

  socket.on('disconnect', (motivo) => {
    console.log(`[-] desconectado ${socket.id} (${motivo})`);
    // TODO 3: sácalo de su sala, avisa a los demás con 'jugador:salio'
    //         y borra la sala si quedó vacía.
  });
});

const PORT = process.env.PORT || 3000;
http.listen(PORT, () => {
  console.log(`Horda de Hierro escuchando en http://localhost:${PORT}`);
});
