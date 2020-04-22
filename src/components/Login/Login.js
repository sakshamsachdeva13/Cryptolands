import React, { useState } from 'react'
import classes from './Login.module.css'
import axios from 'axios'
import Input from '../UI/Input/input'
import Button from '../UI/Button/Button'

const Login = (props) => {
    const [state, setState] = useState(

        {
            controls: {
                email: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'email',
                        placeholder: 'Your E-Mail'
                    },
                    value: '',
                    validation: {
                        required: true,
                        isEmail: true
                    },
                    valid: false,
                    touched: false
                },
                password: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'password',
                        placeholder: 'Enter Password'
                    },
                    value: '',
                    validation: {
                        required: true,

                    },
                    valid: false,
                    touched: false
                }
            },

            isSignup: true,
            authenticated: false

        }
    )

    const usersigninhandler = (event) => {
        event.preventDefault();

        axios.get('https://landregistration.firebaseio.com/User.json')
            .then((Response) => {

                console.log(state.controls.email.value);
                console.log(state.controls.password.value);

                const allusers = Object.keys(Response.data);
                let authenticated = false;
                for (let i in allusers) {
                    const k = allusers[i];
                    if (Response.data[k].email === state.controls.email.value &&
                        Response.data[k].password === state.controls.password.value) {
                        authenticated = true;
                        alert(Response.data[k].address + ' is logged in')
                        break;

                    }

                }
               props.setemail(state.controls.email.value);
                setState((state) => { return { ...state, authenticated: authenticated } })
                if (!authenticated) {
                    alert('invalid user')
                }

            })

    }
    const useregistrationhandler = (event) => {
        event.preventDefault();
        const userData = {
            email: state.controls.email.value,
            password: state.controls.password.value,
            address: props.address
        }
        console.log("this fires")
        axios.post('https://landregistration.firebaseio.com/User.json', userData)
            .then((Response) => {
               props.setemail(state.controls.email.value);

            })

    }




    const formElementsArray = [];
    for (let key in state.controls) {
        formElementsArray.push({
            id: key,
            config: state.controls[key]
        });
    }
    let form = formElementsArray.map(formElement => (
        <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            invalid={!formElement.config.valid}
            shouldValidate={formElement.config.validation}
            touched={formElement.config.touched}
            changed={(event) => inputChangedHandler(event, formElement.id)} />
    ))

    const inputChangedHandler = (event, inputIdentifier) => {
        event.preventDefault();
        const updatedOrderForm = {
            ...state.controls
        };
        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier]
        };
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = true;
        updatedFormElement.touched = true;
        updatedOrderForm[inputIdentifier] = updatedFormElement;

        setState((state) => {
            return {
                ...state,
                controls: updatedOrderForm
            }
        })

    }


    const switchauthhandler = (event) => {
        //  event.preventDefault()
        console.log("this is auth handler it fired")
        setState((prevState) => {
            return {
                ...prevState,
                isSignup: !prevState.isSignup
            }
        })
    }



    return (
        <div className={classes.Auth}>

            <form onSubmit={state.isSignup ? useregistrationhandler : usersigninhandler}>
                {form}
                <Button btnType="Success" >Submit</Button>
            </form>
            <Button clicked={switchauthhandler} btnType="Danger">Switch to {state.isSignup ? 'Signin' : 'Signup'}</Button>

        </div>
    )
}

export default Login   