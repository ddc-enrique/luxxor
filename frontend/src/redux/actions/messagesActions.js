import axios from "axios"

const messagesActions = {
    sendNewMessage: (newMessage) => {
        return async () => {
            let response = await axios.post("http://localhost:4000/api/contact", newMessage)
            if (!response.data.success) throw response.data.response
            return response.data
        }
    },

    getAllMessages: () => {
        return async () => {
            let response = await axios.get("http://localhost:4000/api/admin/messages")
            if(!response.data.success) throw response.data.response
            return response.data.response
        }
    },

    deleteMessage: (id) => {
        return async () => {
            let response = await axios.delete(`http://localhost:4000/api/admin/message/${id}`)
            if(!response.data.success) throw response.data.response
            return response.data
        }
    }
}

export default messagesActions