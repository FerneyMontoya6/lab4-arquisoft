const log = console.log
//Inicilizamos el servidor http , socket.io y el numero de puerto
const http = require('http').createServer()
const io = require('socket.io')(http)
const port = 3000
http.listen(port, ()=> log(`server listening on port : ${port}`))
io.on('connection',(socket) =>{
    log('connected')
    socket.on('message', (evt)=>{
        log(evt)
        socket.broadcast.emit('message', evt)
    })
});
//Activamos la cabecera CORS
http.prependListener("request", (req,res) =>{
    res.setHeader("Access-Control-Allow-Origin","*");
});
io.on('disconnect', (evt)=>{
    log('conexión cerrada')
})