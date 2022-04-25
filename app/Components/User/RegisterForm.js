import React from 'react';
import { connect } from 'react-redux'
import { addUser } from '../../redux/userReducer';

class RegisterForm extends React.Component {
  constructor() {
    super();
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      passwordAgain: '',

    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onChange(evt) {
    this.setState({ [evt.target.name]: evt.target.value });
  }
  onSubmit(evt) {
    evt.preventDefault();
    this.props.addUser({ ...this.state });
  }
  render() {
    const { onChange, onSubmit } = this;
    const { firstName, lastName, email, password, passwordAgain } = this.state;
    return (
      <form onSubmit={onSubmit}>
        <label htmlFor="firstName" >First Name: </label>
        <input value={firstName} onChange={onChange} name="firstName" autoComplete="firstName" />
        <label htmlFor="lastName" >Last Name: </label>
        <input value={lastName} onChange={onChange} name="lastName" autoComplete="lastName" />
        <label htmlFor="email" >Email Address: </label>
        <input value={email} onChange={onChange} name="email" autoComplete="email" />
        <label htmlFor="password" >Password: </label>
        <input value={password} onChange={onChange} name="password" type="password" autoComplete="password" />
        <label htmlFor="password" >Password Once More With Feeling: </label>
        <input value={passwordAgain} onChange={onChange} name="passwordAgain" type="password" autoComplete="password" />
        <button type="submit">Register</button>
      </form>
    );
  }
}

// const mapState = (state) => {
//   return {
//     user: state.user,
//   }
// }
const mapDispatch = (dispatch) => ({
  addUser: (user) => dispatch(addUser(user)),
});

export default connect(null, mapDispatch)(RegisterForm)
