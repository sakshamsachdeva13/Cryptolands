import React, { Component } from 'react'
import NavBar from '../../components/NavBar/NavBar'
import classes from './Layout.module.css'

class Layout extends Component {

    render() {

        return(
            <div className = {classes.Layout}>
                <NavBar />
                <div className = {classes.Container}>
                {this.props.children}
                </div>
               
            </div>
        )
    }
}


export default Layout