import axios from "axios"

const messagesActions = {
    sendNewMessage: (newMessage) => {
        return async () => {
            let response = await axios.post("https://luxxor.herokuapp.com/api/contact", newMessage)
            if (!response.data.success) throw response.data.response
            return response.data
        }
    },

    getAllMessages: () => {
        return async () => {
            let response = await axios.get("https://luxxor.herokuapp.com/api/admin/messages")
            if(!response.data.success) throw response.data.response
            return response.data.response
        }
    },

    deleteMessage: (id, token) => {
        return async () => {
            let response = await axios.delete(`https://luxxor.herokuapp.com/api/admin/message/${id}`, {
                headers: {
                    Authorization: "Bearer " + token
                }
            })
            if(!response.data.success) throw response.data.response
            return response.data
        }
    }
}

export default messagesActions