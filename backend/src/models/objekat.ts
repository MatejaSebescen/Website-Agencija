import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let Objekat = new Schema({
    klijent: {
        type: String
    },
    tip: {
        type: String
    },
    adresa: {
        type: String
    },
    brojProstorija: {
        type: Number
    },
    kvadratura: {
        type: Number
    },
    skicaObjekta: {
        type: String
    }
})

export default mongoose.model("ObjekatModel", Objekat, 'objekti')