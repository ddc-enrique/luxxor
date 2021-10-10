const mongoose = require('mongoose')

const MessageSchema = new mongoose.Schema({
    authorName: { type: String, required: true },
    email: { type: String, required: true },
    textMessage: { type: String, required: true },
    date: { type: Date, required: true }
})

const Message = mongoose.model("message", MessageSchema)

module.exports = Message