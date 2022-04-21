import React from 'react';
import {connect} from 'react-redux'
import { authenticate } from '../redux/authReducer';

class LoginForm extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: ''
    };
    this.onChange = this.onChange.bind(this);
  }
  onChange(ev) {
    this.setState({ [ev.target.name]: ev.target.value });
  }

  render() {
    const { onChange, onSubmit } = this;
    const { email, password } = this.state;
    return (
      <section>
      <div className="highlighted">
        <div><img src="/images/logo.png" /></div>
        <div>
          <form onSubmit={this.props.handleSubmit}>
            <label htmlFor="email" >Email Address: </label>
            <input value={email} onChange={onChange} name="email" />
            <label htmlFor="password" >Password: </label>
            <input value={password} onChange={onChange} name="password" />
            <button type="submit">Sign In</button>
          </form>
        </div>
      </div>
      </section>
    );
  }
}

const mapLogin = (state) => {
  return {
    name: 'login',
    displayName: 'Login',
    // error: state.auth.error //took this from fs-app-template
  }
}

const mapDispatch = (dispatch, history) => {
  return {
    handleSubmit(evt) {
      evt.preventDefault();
      const email = evt.target.email.value
      const password = evt.target.password.value
      dispatch(authenticate(email,password, history))
    }
  }
}

export default connect(mapLogin,mapDispatch)(LoginForm)
