const log = console.log;

// Inicializamos el servidor http, socket.io y el número de puerto
const http = require('http').createServer();
const io = require('socket.io')(http);
const port = 3000;

http.listen(port, () => log(`Server listening on port: ${port}`));

io.on('connection', (socket) => {
    log('Cliente conectado');
    
    // Manejar evento de actualización de información de puerta
    socket.on('update-gate-info', (data) => {
        log('Datos recibidos:', data);
        // Emitir la actualización a todos los clientes conectados
        socket.broadcast.emit('gate-info', data);
    });
    
    // Manejar desconexión del cliente
    socket.on('disconnect', () => {
        log('Cliente desconectado');
    });
});

// Activar la cabecera CORS
http.prependListener("request", (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
});
