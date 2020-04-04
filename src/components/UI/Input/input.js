import React from 'react'
import classes from './input.module.css'

const input = (props) => {
 
    return (
        <div className = {classes.Input}>
            <label className  = {classes.Label}>{props.label}</label>
        <input className = {classes.InputElement} type = {props.type}  />
        </div>
    )
}


export default input
