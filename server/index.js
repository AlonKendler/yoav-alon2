const express = require('express');
const app = express();
const routes = require('./src/routes/routes.js');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();

const allowedOrigins = [process.env.REACT_APP_PORT, process.env.REACT_APP_URL];

const http = require('http').createServer(app);
const io = require('socket.io')(http, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST"]
  }
});



app.use(cors());

app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', routes);

// Initialize codeSessions and codeBlockStatus maps
const codeSessions = {};
const codeBlockStatus = {};

io.on('connection', (socket) => {
  console.log('A User connected:', socket.id);

  socket.on('joinSession', (sessionId) => {
    console.log(`[socket] joinSession: ${sessionId}`);
    socket.join(sessionId);
    socket.sessionId = sessionId;

    if (!codeBlockStatus[sessionId]) {
      codeBlockStatus[sessionId] = 'editing';
      socket.role = 'student';
      console.log(`Student ${socket.id} started editing session ${sessionId}`);
    } else {
      socket.role = 'mentor';
      console.log(`Mentor ${socket.id} joined session ${sessionId}`);
    }

    socket.emit('roleAssignment', socket.role);

    if (codeSessions[sessionId]) {
      socket.emit('codeUpdate', codeSessions[sessionId]);
    }

    io.emit('codeBlockStatusUpdate', codeBlockStatus);
  });

  socket.on('codeChange', (code) => {
    console.log("[socket] codeChange:", code);
    if (socket.sessionId) {
      codeSessions[socket.sessionId] = code;
      socket.to(socket.sessionId).emit('codeUpdate', code);
    }
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected:', socket.id);
    if (socket.role === 'student' && socket.sessionId) {
      delete codeBlockStatus[socket.sessionId];
      io.emit('codeBlockStatusUpdate', codeBlockStatus);
    }
    delete socket.sessionId;
  });
});

const port = process.env.SERVER_PORT;

http.listen(port, () => {
  console.log(`Server and Socket.io listening on port ${port}`);
});