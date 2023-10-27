import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Radnik = new Schema({
    agencija: {
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
    specijalizacija: {
        type: String
    }
})

export default mongoose.model('RadnikModel', Radnik, 'radnici')