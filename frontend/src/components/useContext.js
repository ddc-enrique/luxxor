import React, {useState, createContext} from "react"

let UseContext = createContext()
let {Provider, Consumer} = UseContext

const UseProvider=({children})=>{

    const [modalLog, setModalLog] = useState(true)   
    const modalFalse = () => {
        setModalLog(false)
    }

    const modalTrue = () => {
        setModalLog(true)
    }

    return (
        <Provider value={{modalLog, modalFalse, modalTrue}}>
            {children}
        </Provider>
    )
}

export {UseProvider, Consumer , UseContext}