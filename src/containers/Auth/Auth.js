import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './Auth.module.css';
import { updateObject, checkValidity } from '../../shared/utility';
import { auth } from '../../store/burgerAuthSlice/burgerAuthSlice'

const Auth = props => {
  const navigate = useNavigate()
  const { error, token } = useSelector(state => state.burgerAuth)
  const { building } = useSelector(state => state.burgerBuilder)
  const dispatch = useDispatch()
  const [authForm, setAuthForm] = useState({
    email: {
      elementType: 'input',
      elementConfig: {
        type: 'email',
        placeholder: 'Mail Address'
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
        placeholder: 'Password'
      },
      value: '',
      validation: {
        required: true,
        minLength: 6
      },
      valid: false,
      touched: false
    }
  });
  const [isSignup, setIsSignup] = useState(true);
  const [clicked, setClicked] = useState(false)
  const [mounted, setMounted] = useState(false);
  console.log(token);

  useEffect(() => {
    if (mounted) {
      if (clicked && building && token) {
        navigate('/checkout')
      } if (clicked && !building && token) { navigate('/') }
      // your code here
    } else {
      setMounted(true);
    }
  }, [mounted, clicked, navigate, building, token]);

  const inputChangedHandler = (event, controlName) => {
    const updatedControls = updateObject(authForm, {
      [controlName]: updateObject(authForm[controlName], {
        value: event.target.value,
        valid: checkValidity(
          event.target.value,
          authForm[controlName].validation
        ),
        touched: true
      })
    });
    setAuthForm(updatedControls);
  };
  console.log('BUILDING OUTSIDE USEFFECT', building);

  const submitHandler = event => {
    console.log(building);
    event.preventDefault();
    dispatch(auth({
      email: authForm.email.value,
      password: authForm.password.value,
      isSignup: isSignup
    }));
    // setClicked(true)
  };

  const switchAuthModeHandler = () => {
    setIsSignup(!isSignup);
  };

  const formElementsArray = [];
  for (let key in authForm) {
    formElementsArray.push({
      id: key,
      config: authForm[key]
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
      changed={event => inputChangedHandler(event, formElement.id)}
    />
  ));
  const errorMessage = <p> <strong>ERROR:</strong> {clicked && error ? `${error.toLowerCase()} Please Sign In` : null}</p>

  let authPage = (
    <div className={classes.Auth}>
      <p><strong>STATUS:</strong> {isSignup ? 'Please Sign Up' : 'Please Sign In'} </p>
      {errorMessage}
      <form onSubmit={submitHandler}>
        {form}
        <Button clicked={() => setClicked(true)} btnType="Success">SUBMIT</Button>
      </form>
      <Button clicked={switchAuthModeHandler} btnType="Danger">
        SWITCH TO {isSignup ? 'SIGNIN' : 'SIGNUP'}
      </Button>
    </div>)

  if (mounted) {
    if (clicked) {
      const clickedTime = 1000
      setTimeout(() => {
        authPage = <Spinner />
      }, clickedTime);
    }
  }
  return <React.Fragment>{authPage}</React.Fragment>
};

export default Auth;
