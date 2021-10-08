import React ,{ useRef, useState}from 'react'
import Switch from "react-switch"
import styles from "../styles/productList2.module.css"

const SwitchRadio = (props) => {
    const [checked, setChecked] = useState(false)
    const radioInput = useRef({})

    const handleChange = (checked) => {
        // setChecked(checked)
        radioInput.current.checked = !radioInput.current.checked
    }

    console.log(props.field.name)
    console.log(radioInput.current.checked)

    return (
        <div 
            className={styles.switch}
        >
            <label>
                <span>{props.field.name}</span>
            </label>
            <input 
                type="radio"
                name="brand"
                ref={radioInput}
                // style={{visibility: "hidden"}}
            />
            <Switch
                onChange={handleChange}
                checked={radioInput.current.checked}
                uncheckedIcon={false}
                checkedIcon={false}
                onColor={'#f48f31'}
            />
        </div>
    )
}

export default SwitchRadio
