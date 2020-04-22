import React from 'react'
import classes from './navigation.module.css'
import NavigationItem from './NavigationItem/Navigationitem'
const NavigationItems = (props) => {
  
    return(
                <div className = {classes.NavItems}>
                    <NavigationItem link = "/RegisterForm">RegisterForm</NavigationItem>
                    <NavigationItem  link = "/landinfo">landinfo</NavigationItem>
                    <NavigationItem link = "/">Home</NavigationItem>
                    <NavigationItem link = '/myproperties'>My Properties</NavigationItem>
                    <NavigationItem link = '/buyproperties'>Explore</NavigationItem>
                </div>
    )

}

export default NavigationItems