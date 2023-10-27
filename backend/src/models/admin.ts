import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Admin = new Schema({
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
    profilna: {
        type: String
    }
})

export default mongoose.model('AdminModel', Admin, 'admin')