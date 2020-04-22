import React , {Component }from 'react'
import Input from '../UI/Input/input'
import classes from './registerData.module.css'
import Button from '../UI/Button/Button'
class RegisterForm extends Component   {


    componentDidMount() {
        console.log(this.props.email)
    }
  state =   {
        controls: {
                state: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your State'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
         
            district: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Enter district'
                },
                value: '',
                validation: {
                    required: true,

                },
                valid: false,
                touched: false
            },
            
             village: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Enter village'
                },
                value: '',
                validation: {
                    required: true,


                },
                valid: false,
                touched: false
            }, 
            survnum: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Enter Survey number'
                },
                value: '',
                validation: {
                    required: true,

                },
                valid: false,
                touched: false
            },
            marketvalue: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Enter marketvalue'
                },
                value: '',
                validation: {
                    required: true,

                },
                valid: false,
                touched: false
            },
            
        },

    }




render () {



    const formElementsArray = [];
    for (let key in this.state.controls) {
        
        formElementsArray.push({
            id: key,
            config: this.state.controls[key]
        });
    }
    let form = formElementsArray.map(formElement => (
        <Input
            key={formElement.id}
            label = {formElement.id}
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
            ...this.state.controls
        };
        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier]
        };
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = true;
        updatedFormElement.touched = true;
        updatedOrderForm[inputIdentifier] = updatedFormElement;

        this.setState((state) => {
            return {
                ...state,
                controls: updatedOrderForm
            }
        })

    }

    
    return (
        <div>
            <h1>Register your Land</h1>
 <form className = {classes.Form} onSubmit = {this.props.registerland}>
      {form}
      <Button click = {this.props.registerland} btnType="Success" >Register Land</Button>
      </form>
        </div>
       
    )  
}
    
}


export default RegisterForm;