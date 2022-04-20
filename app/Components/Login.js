import React from 'react';

class Login extends React.Component{
  constructor(){
    super();
    this.state = {
      email: '',
      password: ''
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onChange(ev){
    this.setState({ [ev.target.name]: ev.target.value });
  }
  onSubmit(ev){
    ev.preventDefault();
    const { email, password } = this.state;
    this.props.signIn({
      email,
      password
    });
  }
  render(){
    const { onChange, onSubmit } = this;
    const { email, password } = this.state;
    return (
      <form onSubmit={ onSubmit }>
        <input value={ email } onChange={ onChange } name="email" />
        <input value={ password } onChange={ onChange } name="password" />
        <button type="submit">Sign In</button>
      </form>
    );
  }
}

export default Login
