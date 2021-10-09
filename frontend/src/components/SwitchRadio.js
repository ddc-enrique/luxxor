import React ,{ useEffect, useRef, useState}from 'react'
import Switch from "react-switch"
import styles from "../styles/productList2.module.css"

const SwitchRadio = (props) => {
    const radioInput = useRef({})
    const [checked, setChecked] = useState(radioInput.current.checked)

    const handleChange = (checked) => {
        radioInput.current.checked = !radioInput.current.checked
        setChecked(radioInput.current.checked)
        console.log(radioInput.current.dataset.fieldName)
    }

    return (
        <div 
            className={styles.switch}
        >
            <label>
                <span>{props.field.name}</span>
                <input 
                    type="radio"
                    name="brand"
                    ref={radioInput}
                    onChange={handleChange}
                    data-field-name={props.field.name}
                    // style={{visibility: "hidden"}}
                />
                <Switch
                    onChange={handleChange}
                    checked={checked}
                    uncheckedIcon={false}
                    checkedIcon={false}
                    onColor={'#f48f31'}
                />
            </label>
        </div>
    )
}

export default SwitchRadio
