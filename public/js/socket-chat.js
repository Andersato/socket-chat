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
        renderizarUsuarios(resp)
    })
});

socket.on('crearMensaje', (mensaje) => {
    renderizarMensajes(mensaje, false)
    scrollBottom()
})

socket.on('listaPersona', (personas) => {
    renderizarUsuarios(personas)
})

socket.on('mensajePrivado', (mensaje) => {
    console.log(`Mensaje privado: ${mensaje}`);
})