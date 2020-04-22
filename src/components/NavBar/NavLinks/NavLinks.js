import React, { Component } from 'react'
import classes from './NavLink.module.css'
import {NavLink} from 'react-router-dom'
const NavLinks = (props) => {

    return (
        <div className={classes.NavLinks}>
            <NavLink to={props.link} exact={props.exact}
               activeStyle = {{height : "100%", padding : "1.2rem 0", color : "#FF0019" , borderBottom : "3px solid #FF0019"}}>
                {props.children}
            </NavLink>
        </div>
    )

}



export default NavLinks