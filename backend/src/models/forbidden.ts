import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let Forbidden = new Schema({
    username: {
        type: String
    },
    email: {
        type: String
    }
})

export default mongoose.model("ForbiddenModel", Forbidden, 'forbidden')