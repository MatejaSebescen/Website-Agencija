import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let Agencija = new Schema({
    username: {
        type: String
    },
    lozinka: {
        type: String
    },
    kontaktTelefon: {
        type: String
    },
    email: {
        type: String
    },
    naziv: {
        type: String
    },
    drzava: {
        type: String
    },
    grad: {
        type: String
    },
    ulica: {
        type: String
    },
    maticniBroj: {
        type: String
    },
    opis: {
        type: String
    },
    profilna: {
        type: String
    },
    slobodnihMesta: {
        type: Number
    },
    komentari: {
        type: [{
            klijent: String,
            ocena: String,
            text: String
        }]
    }
})

export default mongoose.model("AgencijaModel", Agencija, 'agencije')