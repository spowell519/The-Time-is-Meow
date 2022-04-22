import React from 'react';

const emptyState = {
  firstName: '', lastName: '', password: '',
  shippingAddress: '', billingAddress: '',
}

class UserSettings extends React.Component {
  constructor(props) {
    super(props);
    this.state = emptyState;

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(evt) {
    const { name, value } = evt.target;
    this.setState((state) => ({...state, [name]: value}))
  }
  handleSubmit(evt) {
    evt.preventDefault();
  }

  render() {
    const {firstName, lastName, password, shippingAddress, billingAddress} = this.state;
    const { handleSubmit, handleChange } = this;
    return (
      <form id="userSettingsUpdate" onSubmit={handleSubmit}>
        <label htmlFor="firstName" >First Name</label>
        <input value={firstName} onChange={handleChange} name="firstName" />

        <label htmlFor="lastName" >Last Name</label>
        <input value={lastName} onChange={handleChange} name="lastName" />

        <label htmlFor="password" >Password</label>
        <input value={password} onChange={handleChange} name="password" />

        <label htmlFor="shippingAddress" >Shipping Address</label>
        <input value={shippingAddress} onChange={handleChange} name="shippingAddress" />

        <label htmlFor="billingAddress" >Billing Address</label>
        <input value={billingAddress} onChange={handleChange} name="billingAddress" />

        <button type="submit">Save</button>
      </form>
    )
  }
}

export default UserSettings;
