import React from 'react';
import { connect } from 'react-redux'
import validator from 'validator';

import { addUser } from '../../redux/userReducer';

class RegisterForm extends React.Component {
  constructor() {
    super();
    this.state = {
      firstName: '', firstNameValid: false,
      lastName: '', lastNameValid: false,
      email: '', emailValid: false,
      password: '', passwordValid: false,
      passwordAgain: '',

    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.formValid = this.formValid.bind(this);
  }
  onChange(evt) {
    const { name, value } = evt.target;
    if (name !== 'password' && name !== 'passwordAgain') {
      (name === 'email')
        ? this.setState((state) => ({ ...state, emailValid: validator.isEmail(value) }))
        : this.setState((state) => ({ ...state, [`${name}Valid`]: value.length > 0 }))
    }
    if (name === 'password' || name === 'passwordAgain') {
      this.setState((state) => ({
        ...state,
        passwordValid:
          (name === 'password')
            ? value === this.state.passwordAgain
            : value === this.state.password
      }))
    }
    this.setState({ [name]: value });
  }
  onSubmit(evt) {
    evt.preventDefault();
    if (this.formValid) this.props.addUser({ ...this.state });
  }
  formValid() {
    return (this.state.firstNameValid && this.state.lastNameValid && this.state.emailValid && this.state.passwordValid)
  }
  render() {
    const { onChange, onSubmit } = this;
    const { firstName, lastName, email, password, passwordAgain,
      firstNameValid, lastNameValid, emailValid, passwordValid } = this.state;
    return (
      <form onSubmit={onSubmit}>
        <label htmlFor="firstName" >First Name: <span className={(firstNameValid) ? 'valid' : 'required'}>required</span></label>
        <input value={firstName} onChange={onChange} name="firstName" autoComplete="firstName" />
        <label htmlFor="lastName" >Last Name: <span className={(lastNameValid) ? 'valid' : 'required'}>required</span></label>
        <input value={lastName} onChange={onChange} name="lastName" autoComplete="lastName" />
        <label htmlFor="email" >Email Address: <span className={(emailValid) ? 'valid' : 'required'}>required</span></label>
        <input value={email} onChange={onChange} name="email" autoComplete="email" />
        <label htmlFor="password" >Password: <span className={(passwordValid) ? 'valid' : 'required'}>required</span> </label>
        <input value={password} onChange={onChange} name="password" type="password" autoComplete="password" />
        <label htmlFor="password" >Password Once More With Feeling: <span className={(passwordValid) ? 'valid' : 'required'}>required</span> </label>
        <button type="submit" disabled={!this.formValid()}>Register</button>
        <input value={passwordAgain} onChange={onChange} name="passwordAgain" type="password" autoComplete="password" />
      </form>
    );
  }
}

// const mapState = (state) => {
//   return {
//     user: state.user,
//   }
// }
const mapDispatch = (dispatch, history) => ({
  addUser: (user) => dispatch(addUser(user), history),
});

export default connect(null, mapDispatch)(RegisterForm)
