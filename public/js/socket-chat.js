var socket = io();

let params = new URLSearchParams(window.location.search)

if (!params.has('nombre') || !params.has('sala')) {
    window.location = 'index.html'
    throw new Error('El nombre y sala son necesarios')
}
let usuario = {
    nombre: params.get('nombre'),
    sala: params.get('sala')
}

socket.on('connect', () => {
    socket.emit('entrarChat', usuario, (resp) => {
        console.log(resp);
    })
});

socket.on('crearMensaje', (mensaje) => {
    console.log('Servidor:', mensaje);
})

socket.on('listaPersona', (personas) => {
    console.log('Servidor:', personas);
})

socket.on('mensajePrivado', (mensaje) => {
    console.log(`Mensaje privado: ${mensaje}`);
})

// socket.emit('crearMensaje', {

// })