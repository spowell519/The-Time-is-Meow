import React from 'react';
import { connect } from 'react-redux';

import { getUser, editUser } from '../../redux/userReducer';


const emptyState = {
  firstName: '', lastName: '', password: '',
  email: '', shippingAddress: '', billingAddress: '',
}

class UserSettings extends React.Component {
  constructor(props) {
    super(props);
    this.state = emptyState;

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
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
      this.setState({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        password: user.password || '',
        email: user.email || '',
        shippingAddress: user.shippingAddress || '',
        billingAddress: user.billingAddress || '',
        inventory: user.inventory || '',
        id: user.id,
      });
    }
  }

  handleChange(evt) {
    const { name, value } = evt.target;
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

  render() {
    const { firstName, lastName, password, email, shippingAddress, billingAddress } = this.state;
    const { handleSubmit, handleChange } = this;
    return (
      <form id="userSettingsUpdate" onSubmit={handleSubmit}>
        <label htmlFor="firstName" >First Name</label>
        <input value={firstName} onChange={handleChange} name="firstName" />

        <label htmlFor="lastName" >Last Name</label>
        <input value={lastName} onChange={handleChange} name="lastName" />

        <label htmlFor="password" >Password</label>
        <input type="password" value={password} onChange={handleChange} name="password" />

        <label htmlFor="email" >Email</label>
        <input value={email} onChange={handleChange} name="email" />

        <label htmlFor="shippingAddress" >Shipping Address</label>
        <input value={shippingAddress} onChange={handleChange} name="shippingAddress" />

        <label htmlFor="billingAddress" >Billing Address</label>
        <input value={billingAddress} onChange={handleChange} name="billingAddress" />

        <button type="submit">Save</button>
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
