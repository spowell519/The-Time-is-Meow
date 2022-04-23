import React from 'react';
import {connect} from 'react-redux'

class RegisterForm extends React.Component {
  constructor() {
    super();
    this.state = {
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
    this.props.addUser({...this.state});
  }
render() {
    const { onChange, onSubmit } = this;
    const { email, password, passwordAgain } = this.state;
    return (
      <form onSubmit={onSubmit}>
        <label htmlFor="email" >Email Address: </label>
        <input value={email} onChange={onChange} name="email" autoComplete="email" />
        <label htmlFor="password" >Password: </label>
        <input value={password} onChange={onChange} name="password" type="password" autoComplete="password"/>
        <label htmlFor="password" >Password Once More With Feeling: </label>
        <input value={passwordAgain} onChange={onChange} name="passwordAgain" type="password" autoComplete="password"/>
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
