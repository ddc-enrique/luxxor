import {useState} from "react"

let useContext = React.createContext()
let {Provider, Consumer} = useContext

const UseProvider=({children})=>{

    const [modalLog, setModalLog] = useState(true)

    const

    return (
        <Provider value={}>
            {children}
        </Provider>
    )
}

export {UseProvider, Consumer as useConsumer, useContext}