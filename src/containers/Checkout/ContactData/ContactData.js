import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';
import Input from '../../../components/UI/Input/Input';
import { useSelector } from 'react-redux';

const ContactData = (props) => {
    const navigate = useNavigate()
    const { ingredients, totalPrice } = useSelector(state => state.burgerBuilder)

    const [state, setState] = useState({
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP Code'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5,
                    isNumeric: true
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
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
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: 'fastest', displayValue: 'Fastest' },
                        { value: 'cheapest', displayValue: 'Cheapest' }
                    ]
                },
                value: '',
                validation: {},
                valid: true
            }
        },
        formIsValid: false,
        loading: false
    })
    const OrderHandler = (event) => {
        event.preventDefault();
        setState({ loading: true });
        const formData = {};
        for (let formElementIdentifier in state.orderForm) {
            formData[formElementIdentifier] = state.orderForm[formElementIdentifier].value;
        }
        // {
        //     ingredients: props.ingredients,
        //     price: props.price,
        //     orderData: formData
        // }

        console.log(ingredients, 'ingredients', totalPrice);

        const uploadData = {
            ingredients: ingredients,
            price: totalPrice,
            orderData: formData
        }

        axios.post('/orders.json', uploadData)
            .then(response => {
                setState({ loading: false });
                navigate('/');
            })
            .catch(error => {
                setState({ loading: false });
            });
    }

    const checkValidity = (value, rules) => {
        let isValid = true;
        if (!rules) {
            return true;
        }

        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }

        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }

        return isValid;
    }

    const inputChangedHandler = (event, inputIdentifier) => {
        const updatedOrderForm = {
            ...state.orderForm
        };
        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier]
        };
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedOrderForm[inputIdentifier] = updatedFormElement;

        let formIsValid = true;
        for (let inputIdentifier in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
        }
        setState({ orderForm: updatedOrderForm, formIsValid: formIsValid });
    }

    const formElementsArray = [];
    for (let key in state.orderForm) {
        formElementsArray.push({
            id: key,
            config: state.orderForm[key]
        });
    }

    let form = (
        <form onSubmit={OrderHandler}>
            {formElementsArray.map(formElement => (
                <Input
                    key={formElement.id}
                    elementType={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value}
                    invalid={!formElement.config.valid}
                    shouldValidate={formElement.config.validation}
                    touched={formElement.config.touched}
                    changed={(event) => inputChangedHandler(event, formElement.id)} />
            ))}
            <Button btnType="Success" disabled={!state.formIsValid}>ORDER</Button>
        </form>
    );
    if (state.loading) {
        form = <Spinner />;
    }


    return (
        <div className={classes.ContactData}>
            <h4>Enter your Contact Data</h4>
            {form}
        </div>
    );
}

export default ContactData;