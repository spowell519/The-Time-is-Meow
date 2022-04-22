import React from 'react';
import { connect } from 'react-redux';

const UserManagement = (props) => {
  return (
    <ul>
      <li>User 1</li>
      <li>User 2</li>
      <li>User 3</li>
      <li>User 4</li>
    </ul>
  )
}


const mapState = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapState, null)(UserManagement);
