import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let Poslovi = new Schema({
    agencija: {
        type: String
    },
    klijent: {
        type: String
    },
    adresa: {
        type: String
    },
    datumOd: {
        type: Date
    },
    datumDo: {
        type: Date
    },
    status: {
        type: String
    },
    nadoknada: {
        type: Number
    }
})

export default mongoose.model("PosloviModel", Poslovi, 'poslovi')