import React from 'react'
import classes from './button.module.css'

const button = (props) => {

     return (
         <button className = {[classes.Button , classes[props.btnType]].join(' ')} >{props.children}</button>
     )
}

export default button