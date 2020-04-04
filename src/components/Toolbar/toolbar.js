import React from  'react'
import classes from './toolbar.module.css'
import NavigationItems from '../Navigation/NavigationItems/NavigationItems'
const toolbar = (props) => {

    return (
        <header className = {classes.Toolbar}>
                <NavigationItems />
        </header>
    )
}

export default toolbar