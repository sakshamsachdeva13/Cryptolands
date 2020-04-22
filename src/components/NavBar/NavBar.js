import React from 'react'
import { Component } from 'react';
import NavLinks from './NavLinks/NavLinks'
import classes from './NavBar.module.css'
// import Logo from  '../UI/Logo/Logo'
class NavBar extends Component {

    render() {

        let links = (
            <div  className={classes.Navlink}  >
                <NavLinks exact link='/'>Home </NavLinks>
                <NavLinks link='/RegisterForm'>RegisterForm</NavLinks>
                <NavLinks link='/Login'>Login</NavLinks>
                <NavLinks link='/Buy'>Buy Properties</NavLinks>
                <NavLinks link='/requests'>Properties Request</NavLinks>
            </div>

        )
        if (this.props.email == "admin") {
            links = (
                <div className={classes.Navlink} >
                    <NavLinks link='/Login'>Login</NavLinks>
                    <NavLinks link='/validate' >Validate properties</NavLinks>
                </div>

            )
        }
        return (
            <header className={classes.NavBar}>
                <div className={classes.Logo}>
                    {/* <Logo /> */}
                </div>
               
                        {links}
            

            </header>
        )
    }
}

export default NavBar;