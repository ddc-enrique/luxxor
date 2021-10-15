const Message = require("../models/Message")

const messagesControllers ={
    sendNewMessage: (req, res) =>{
        const {authorName, email, textMessage} = req.body
        const newMessage = new Message({
            authorName: authorName.trim(),
            email: email.trim(),
            textMessage: textMessage.trim(),
            date: Date()
        })
        newMessage.save()
            .then( () => res.json({ success: true }) )
            .catch( (error) => {
                res.json({ success: false, response: error })
            })
    },

    getAllMessages: (req, res) => {
        Message.find()
            .then( (messages) => {
                if(!messages.length) throw new Error("No hay mensajes por mostrar")
                res.json({ success: true, response: messages })
            })
            .catch( (error) => res.json({ success: false, response: error.message }) )
    },

    deleteMessage: (req, res) => {
        Message.findOneAndDelete({ _id: req.params.id })
            .then( () => res.json({ success: true }) )
            .catch( (error) => res.json({ success: false, response: error.message }) )
    }
}

module.exports = messagesControllers