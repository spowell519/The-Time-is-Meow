import React from 'react';
import { connect } from 'react-redux';

const UserMenu = (props) => {
  console.log('status', props.auth, props.auth.isAdmin)
  return (
    <div className="menu">
      <img src="/images/logo.png" />
      <h3 className={(!props.auth.email) ? 'bubble' : ''}>Not Logged In</h3>
      <ul>
        <li>Log In</li>
        <li>Register</li>
      </ul>
      <h3 className={(props.auth.email && !props.auth.isAdmin) ? 'bubble' : ''}>Logged In User</h3>
      <ul>
        <li>Settings</li>
        <li>Orders</li>
        <li>Log Out</li>
      </ul>
      <h3 className={(props.auth && props.auth.isAdmin) ? 'bubble' : ''}>Logged In Admin</h3>
      <ul>
        <li>Users Admin</li>
        <li>Settings</li>
        <li>Orders</li>
        <li>Log Out</li>
      </ul>
    </div>
  )
}

const mapState = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapState, null)(UserMenu);
