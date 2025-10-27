const { createServer} = require('http');
const {Server} = require('socket.io');
const registerChatSockets = require('../sockets/chatSockets');



 module.exports = function attachSocket(app){
const httpServer = createServer(app);
const io = new Server(httpServer,{
    cors:{
        origin:'*',
        methods: ['GET', 'POST']
    },
});

app.set('io',io);
if(typeof registerChatSockets === 'function'){
    registerChatSockets(io);
}
return{httpServer, io};
 }