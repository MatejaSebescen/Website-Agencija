import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Zahtev = new Schema({
    tip: {
        type: String
    },
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
    ime: {
        type: String
    },
    prezime: {
        type: String
    },
    profilna: {
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
    komentari: {
        type: [{
            klijent: String
        },
        {
            ocena: Number
        },
        {
            text: String
        }]
    },
    agencija: {
        type: String
    },
    specijalizacija: {
        type: String
    }
})

export default mongoose.model('ZahtevModel', Zahtev, 'zahtevi')