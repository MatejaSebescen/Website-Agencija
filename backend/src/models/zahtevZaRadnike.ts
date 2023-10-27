import mongoose from "mongoose";

const Schema = mongoose.Schema;

let ZahtevZaRadnike = new Schema({
    agencija: {
        type: String
    },
    broj: {
        type: Number
    }
})

export default mongoose.model('ZahtevZaRadnikeModel', ZahtevZaRadnike, 'zahteviZaRadnike')