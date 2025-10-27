const jwt = require('jsonwebtoken');

module.exports = function registerChatSockets(io) {
  io.on('connection', (socket) => {
    console.log('Socket connected:', socket.id);

    
    socket.on('auth', (payload) => {
      try {
        if (!payload) return;
        if (payload.token) {
          const decoded = jwt.verify(payload.token, process.env.JWT_SECRET || '');
          if (decoded && decoded.id) {
            socket.userId = decoded.id.toString();
            socket.join(socket.userId);
            console.log(`Socket ${socket.id} authenticated as ${socket.userId}`);
          }
        } else if (payload.userId) {
          socket.userId = payload.userId.toString();
          socket.join(socket.userId);
          console.log(`Socket ${socket.id} joined room for user ${socket.userId}`);
        }
      } catch (err) {
        console.warn('Socket auth failed:', err.message);
      }
    });

    
    socket.on('join_chat', ({ chatId }) => {
      if (chatId) {
        socket.join(chatId.toString());
        console.log(`Socket ${socket.id} joined chat ${chatId}`);
      }
    });

    socket.on('leave_chat', ({ chatId }) => {
      if (chatId) {
        socket.leave(chatId.toString());
        console.log(`Socket ${socket.id} left chat ${chatId}`);
      }
    });

    
    socket.on('send_message', ({ chatId, message, recipientId }) => {
      if (!chatId || !message) return;
      const payload = { chatId, message };
      io.to(chatId.toString()).emit('chat:new_message', payload);
      if (recipientId) io.to(recipientId.toString()).emit('chat:new_message', payload);
    });

    
    socket.on('typing', ({ chatId, userId, isTyping = true }) => {
      if (!chatId) return;
      socket.to(chatId.toString()).emit('chat:typing', { chatId, userId, isTyping });
    });

    socket.on('disconnect', (reason) => {
      console.log('Socket disconnected:', socket.id, 'reason:', reason); 
    });
  });
};