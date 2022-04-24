import React from 'react';
import { connect } from 'react-redux';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';

import LoginForm from '../LoginForm';
import RegisterForm from './RegisterForm';

class AnonPanel extends React.Component {
  componentDidMount() {
    console.log('I am', (this.props.auth.firstName) ? this.props.auth.firstName : "logged out")
  }
  componentDidUpdate() {
    console.log('I am', (this.props.auth.firstName) ? this.props.auth.firstName : "logged out")
  }
  render() {
    return (
      <div className="highlighted">
        <div className="menu">
          <img src="/images/logo.png" />
          <h3>Sign in or sign up!</h3>
        </div>
        <div>
          <Tabs defaultActiveKey="login" id="notLoggedIn">
            <Tab eventKey="login" title="Log In">
            <LoginForm />
            </Tab>
            <Tab eventKey="register" title="Register">
              <RegisterForm />
            </Tab>
          </Tabs>
        </div>
      </div>
    )
  }
}

const mapState = (state) => {
  return {
    auth: state.auth,
  };
};

const mapDispatch = (dispatch, history) => {
  return {
    logout: () => dispatch(logout(history)),
  }
};

export default connect(mapState, mapDispatch)(AnonPanel);
