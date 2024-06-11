/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import { useState } from "react";


const Togglabel = (props) => {
    const [visible, setVisible] = useState(false)
    const hideVisible = {display: visible ? 'none': ''}
    const showVisible = {display: visible? '' : 'none'}

    const toggleVisible = () => {
        setVisible(!visible)
    }
  return (
    <div>
        <div style={hideVisible}>
            <button onClick={toggleVisible}>{props.buttonLabel}</button>
        </div>
        <div style={showVisible}>
            {props.children}
            <button onClick={toggleVisible}>cancel</button>
        </div>
    </div>
  )
}

export default Togglabel