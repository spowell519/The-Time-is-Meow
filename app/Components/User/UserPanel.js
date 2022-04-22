import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import LoginForm from '../LoginForm';
import UserSettings from './UserSettings';
import OrderList from './OrderList';
import UserManagement from './UserManagement';
import OrderManagement from './OrderManagement';
import { logout } from '../../redux/authReducer';

class UserPanel extends React.Component {
  componentDidMount() {
    console.log('I am', (this.props.auth.firstName) ? this.props.auth.firstName : "logged out")
  }
  componentDidUpdate() {
    console.log('I am', (this.props.auth.firstName) ? this.props.auth.firstName : "logged out")
  }
  render() {
    return (
      <div>
        <h3>Log In</h3>
        <div><LoginForm /></div>
        <h3>Register</h3>
        <div><Link to="">Register</Link></div>
        <h3>Log Out</h3>
        <div><button type="button" onClick={this.props.logout}>Logout</button></div>
        <h3>User Settings</h3>
        <div><UserSettings /></div>
        <h3>User: Order List</h3>
        <div><OrderList /></div>
        <h3>Admin: User Management</h3>
        <div><UserManagement /></div>
        <h3>Admin: Order Management</h3>
        <div><OrderManagement /></div>
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

export default connect(mapState, mapDispatch)(UserPanel);
