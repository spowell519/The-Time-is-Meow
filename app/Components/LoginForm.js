import React from 'react';
import { connect } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import validator from 'validator';

import { authenticate } from '../redux/authReducer';

class LoginForm extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '', emailValid: false,
      password: '', passwordValid: false,
    };
    this.onChange = this.onChange.bind(this);
    this.formValid = this.formValid.bind(this);
  }
  onChange(evt) {
    const { name, value } = evt.target;
    (name === 'email')
      ? this.setState((state) => ({ ...state, emailValid: validator.isEmail(value) }))
      : this.setState((state) => ({ ...state, passwordValid: value.length > 0 }))
    this.setState({ [name]: value });
  }
  formValid() {
    return (this.state.emailValid && this.state.passwordValid)
  }
  render() {
    const { onChange } = this;
    const { email, password, emailValid, passwordValid } = this.state;
    if (this.props.error) {
      toast.error('Wrong Email or Password!', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    return (
      <form onSubmit={this.props.handleSubmit}>
        <label htmlFor="email" >Email Address: <span className={(emailValid) ? 'valid' : 'required'}>required</span></label>
        <input value={email} onChange={onChange} name="email" />
        <label htmlFor="password" >Password: <span className={(passwordValid) ? 'valid' : 'required'}>required</span></label>
        <input value={password} onChange={onChange} name="password" />
        <button type="submit" disabled={!this.formValid()}>Sign In</button>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </form>
    );
  }
}

const mapLogin = (state) => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.auth.error //took this from fs-app-template
  }
}

const mapDispatch = (dispatch, history) => {
  return {
    handleSubmit(evt) {
      evt.preventDefault();
      const email = evt.target.email.value
      const password = evt.target.password.value
      dispatch(authenticate(email, password, history))
    }
  }
}

export default connect(mapLogin, mapDispatch)(LoginForm)
