import React from 'react';
import { connect } from 'react-redux';
import validator from 'validator';

import { getUser, editUser } from '../../redux/userReducer';


const emptyState = {
  firstName: '', lastName: '', password: '',
  email: '', shippingAddress: '', billingAddress: '',
  firstNameValid: true, lastNameValid: true, passwordValid: true,
  emailValid: true,
}

class UserSettings extends React.Component {
  constructor(props) {
    super(props);
    this.state = emptyState;

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.formValid = this.formValid.bind(this);
  }

  componentDidMount() {
    try {
      const token = window.localStorage.getItem('token');
      this.props.getUser(token);
    }
    catch (error) {
      console.error(error)
    }
  }

  // eslint-disable-next-line complexity
  componentDidUpdate() {
    if (this.state.id !== this.props.user.id) {
      const user = this.props.user;
      this.setState((state) => ({
        ...state,
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        password: user.password || '',
        email: user.email || '',
        shippingAddress: user.shippingAddress || '',
        billingAddress: user.billingAddress || '',
        inventory: user.inventory || '',
        id: user.id,
      }));
    }
  }

  handleChange(evt) {
    const { name, value } = evt.target;
    (name === 'email')
    ? this.setState((state) => ({...state, emailValid: validator.isEmail(value)}))
    : this.setState((state) => ({...state, [`${name}Valid`]: value.length > 0 }))

    this.setState((state) => ({ ...state, [name]: value }))
  }

  handleSubmit(evt) {
    evt.preventDefault();
    const { firstName, lastName, email, password, shippingAddress, billingAddress } = this.state;

    this.props.editUser({
      firstName,
      lastName,
      email,
      password,
      shippingAddress,
      billingAddress
    }, this.props.user.id);
  }

  formValid() {
    return (this.state.firstNameValid && this.state.lastNameValid && this.state.emailValid && this.state.passwordValid)
  }

  render() {
    const { firstName, lastName, password, email,
            firstNameValid, lastNameValid, passwordValid, emailValid,
            shippingAddress, billingAddress } = this.state;

    const { handleSubmit, handleChange } = this;
    return (
      <form id="userSettingsUpdate" onSubmit={handleSubmit}>
        <label htmlFor="firstName" >First Name: <span className={(firstNameValid) ? 'valid' : 'required'}>required</span></label>
        <input value={firstName} onChange={handleChange} name="firstName" />

        <label htmlFor="lastName" >Last Name: <span className={(lastNameValid) ? 'valid' : 'required'}>required</span></label>
        <input value={lastName} onChange={handleChange} name="lastName" />

        <label htmlFor="password" >Password: <span className={(passwordValid) ? 'valid' : 'required'}>required</span></label>
        <input type="password" value={password} onChange={handleChange} autoComplete="current-password" name="password" />

        <label htmlFor="email" >Email: <span className={(emailValid) ? 'valid' : 'required'}>required</span></label>
        <input value={email} onChange={handleChange} name="email" />

        <label htmlFor="shippingAddress" >Shipping Address</label>
        <input value={shippingAddress} onChange={handleChange} name="shippingAddress" />

        <label htmlFor="billingAddress" >Billing Address</label>
        <input value={billingAddress} onChange={handleChange} name="billingAddress" />

        <button type="submit" disabled={!this.formValid()}>Save</button>
      </form>
    )
  }
}

const mapState = (state) => {
  return {
    auth: state.auth,
    user: state.user
  }
}

const mapDispatch = (dispatch) => ({
  getUser: (id) => dispatch(getUser(id)),
  editUser: (user, id) => dispatch(editUser(user, id)),
});

export default connect(mapState, mapDispatch)(UserSettings);
