import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Klijent = new Schema({
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
    }
})

export default mongoose.model('KlijentModel', Klijent, 'klijenti')