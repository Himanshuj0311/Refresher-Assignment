document.addEventListener('DOMContentLoaded', () => {
    const socket = io();
  
    // Event listeners for sending messages
    const sendButton = document.getElementById('send');
    const messageInput = document.getElementById('message');
  
    sendButton.addEventListener('click', () => {
      const message = messageInput.value;
      socket.emit('chat message', message);
      messageInput.value = '';
    });
  
    socket.on('chat message', (msg) => {
      const chat = document.getElementById('chat');
      const newMessage = document.createElement('div');
      newMessage.textContent = msg;
      chat.appendChild(newMessage);
    });
  });
  