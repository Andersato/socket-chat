class Usuarios {
    constructor() {
        this.personas = []
    }

    agregarPersona(id, nombre, sala) {
        let persona = { id, nombre, sala }

        this.personas.push(persona)

        return this.personas
    }

    getPersona(id) {
        let persona = this.personas.filter(persona => id === persona.id)[0]

        return persona
    }

    getPersonas() {
        return this.personas
    }

    getPersonasPorSala(sala) {
        let personasEnSala = this.personas.filter(persona => persona.sala === sala)

        return personasEnSala
    }

    borrarPersona(id) {
        let persona = this.getPersona(id)

        this.personas = this.personas.filter(persona => id !== persona.id)

        return persona
    }
}


module.exports = {
    Usuarios
}