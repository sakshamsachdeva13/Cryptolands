import React , {Component }from 'react'
import Input from '../UI/Input/input'
import classes from './registerData.module.css'
import Button from '../UI/Button/Button'
class RegisterForm extends Component   {
render () {


    
    return (
        <form className = {classes.Form} onSubmit = {this.props.registerland}>
        <Input  type = "text" placeholder = "state"    label = "state" />
        <Input  type = "text" placeholder = "district" label = "district" />
         <Input type = "text" placeholder = "village"  label= "village" />
         <Input type = "text" placeholder = "survnum"  label = "surveynumber" />
         <Input type = "text" placeholder = "marketvalue" label = "marketvalue" />
         <Button btnType = "Success" >Register</Button>
      </form>
    )  
}
    
}


export default RegisterForm;