import React from 'react'
import classes from './input.module.css'

const input = (props) => {

    return (
        <div className = {classes.Input}>
            <label className  = {classes.Label}>{props.label}</label>
        <input onChange = {props.changed}  className = {classes.InputElement} placeholder = {props.elementConfig.placeholder} type = {props.elementConfig.type}  />
        </div>
    )
}


export default input
