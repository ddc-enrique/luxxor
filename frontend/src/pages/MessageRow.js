import React, { useState } from 'react'
import Moment from 'react-moment'


const MessageRow = ({ message, deleteMessage, styles}) => {
    const [modal, setModal] = useState(false)

    return (
        <tr>
            <td>
                <Moment format="YYYY/MM/DD">
                    {message.date}
                </Moment>
            </td>
            <td>
                {message.authorName}
            </td>
            <td>
                {message.email}
            </td>
            <td
                onClick={ () => {console.log(message.textMessage); setModal(true)}}
                className={styles.viewTextMessage}
            >
                {/* <img
                    src="https://i.postimg.cc/0NymP3J3/2-removebg-preview-4.png"
                    // className={styles.closeModalText}
                /> */}
                +
            </td>
            <td
                onClick={()=> deleteMessage(message._id)}
                className={styles.deleteMessage}
            >
                Eliminar
            </td>
        { modal && 
            <div
                className={styles.modalTextMessage}
                onClick={() => setModal(false)}
            >
                <div>
                    <h4>Mensaje de {message.authorName}</h4>
                    <img
                        src="https://i.postimg.cc/0NymP3J3/2-removebg-preview-4.png"
                        className={styles.closeModalText}
                    />
                </div>
                <p>Texto del Mensaje:</p>
                <p
                    className={styles.textBody}
                >
                    {message.textMessage}
                </p>
                <div>
                    <p>Email de contacto: {message.email}</p>
                    <p>Día del mensaje: <Moment format="YYYY/MM/DD">{message.date}</Moment></p>
                </div>
            </div>
        }
        </tr>
    )
}

export default MessageRow
