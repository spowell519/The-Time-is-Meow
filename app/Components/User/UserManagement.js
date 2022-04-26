import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Table from 'react-bootstrap/Table';

import { getUsersAdmin } from '../../redux/usersReducer';

export const UserManagement = ({users, fetchUsers}) => {
  useEffect(() => {fetchUsers()}, []);
  const allUsers = users || [];
  console.log('users', allUsers);
  return (
    <Table borderless hover>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Admin</th>
          <th>Password</th>
        </tr>
      </thead>
      <tbody>
        {allUsers.map(user => {
          return (
            <tr key={user.id}>
              <td>{user.firstName} {user.lastName}</td>
              <td>{user.email}</td>
              <td>{(user.isAdmin) ? 'Yes' : 'No'}</td>
              <td><a>Reset</a></td>
            </tr>
          )
        })}
      </tbody>
    </Table>
  )
}


const mapState = (state) => {
  return {
    users: state.users,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchUsers: () => dispatch(getUsersAdmin()),
  }
}

export default connect(mapState, mapDispatch)(UserManagement);
