let parameters = new URLSearchParams(window.location.search)

var data = {
    nombre: parameters.get('nombre'),
    sala: parameters.get('sala')
}

// referencias de jquery
let divUsarios = $('#divUsuarios')
let formEnviar = $('#formEnviar')
let txtMensaje = $('#txtMensaje')
let divChatbox = $('#divChatbox')

// Funciones para renderizar usuarios
function renderizarUsuarios(personas) {
    let html = ''

    html += '<li>'
    html += '    <a href="javascript:void(0)" class="active"> Chat de <span> ' + parameters.get('sala') + ' </span></a>'
    html += '</li>'

    for (let i = 0; i < personas.length; i++) {
        html += '<li>'
        html += '    <a data-id="' + personas[i].id + '" href="javascript:void(0)"><img src="assets/images/users/1.jpg" alt="user-img" class="img-circle"> <span>' + personas[i].nombre + '<small class="text-success">online</small></span></a>'
        html += '</li>'
    }

    divUsarios.html(html)
}

function renderizarMensajes(mensaje, yo) {
    let html = ''
    let fecha = new Date(mensaje.fecha)
    let hora = fecha.getHours() + ':' + fecha.getMinutes()

    let adminClass = 'info'
    if ('Administrador' === mensaje.nombre) {
        adminClass = 'danger'
    }


    if (yo) {
        html += '<li class="reverse">'
        html += ' <div class="chat-content">'
        html += '  <h5>' + mensaje.nombre + '</h5>'
        html += '  <div class="box bg-light-inverse">' + mensaje.mensaje + '</div>'
        html += ' </div>'
        html += ' <div class="chat-img"><img src="assets/images/users/5.jpg" alt="user" /></div>'
        html += ' <div class="chat-time">' + hora + '</div>'
        html += '</li>'
    } else {
        html += '<li class="fadeIn">'
        if ('Administrador' !== mensaje.nombre) {
            html += '    <div class="chat-img"><img src="assets/images/users/1.jpg" alt="user" /></div>'
        }
        html += '    <div class="chat-content">'
        html += '        <h5>' + mensaje.nombre + '</h5>'
        html += '        <div class="box bg-light-' + adminClass + '">' + mensaje.mensaje + '</div>'
        html += '    </div>'
        html += '    <div class="chat-time">' + hora + '</div>'
        html += '</li>'
    }

    divChatbox.append(html)
}

function scrollBottom() {

    // selectors
    var newMessage = divChatbox.children('li:last-child');

    // heights
    var clientHeight = divChatbox.prop('clientHeight');
    var scrollTop = divChatbox.prop('scrollTop');
    var scrollHeight = divChatbox.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight() || 0;

    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        divChatbox.scrollTop(scrollHeight);
    }
}


// Listeners
divUsarios.on('click', 'a', function() {

    let id = $(this).data('id')

    if (id) {
        console.log(id);
    }
})

formEnviar.on('submit', function(e) {
    e.preventDefault()

    if (0 === txtMensaje.val().trim().length) {
        return
    }

    socket.emit('crearMensaje', {
        nombre: usuario.nombre,
        mensaje: txtMensaje.val()
    }, function(mensaje) {
        txtMensaje.val('').focus()
        renderizarMensajes(mensaje, true)
        scrollBottom()
    })
})