import axios from "axios"

const messagesActions = {
    sendNewMessage: (newMessage) => {
        return async () => {
            let response = await axios.post("http://localhost:4000/api/contact", newMessage)
            if (!response.data.success) throw response.data.response
            return response.data.response
        }
    },

}

export default messagesActions