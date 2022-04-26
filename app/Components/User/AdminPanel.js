import React from 'react';
import { connect } from 'react-redux';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';

import UserSettings from './UserSettings';
import OrderList from './OrderList';
import UserManagement from './UserManagement';
import OrderManagement from './OrderManagement';

class UserPanel extends React.Component {
  componentDidMount() {
    console.log('I am', (this.props.auth.firstName) ? this.props.auth.firstName : "logged out")
  }
  componentDidUpdate() {
    console.log('I am', (this.props.auth.firstName) ? this.props.auth.firstName : "logged out")
  }
  render() {
    return (
      <div className="highlighted">
        <div className="menu left">
          <img src="/images/logo.png" />
        </div>
        <div className="wide">
          <h3>{(this.props.auth.firstName) ? `Welcome, admin ${this.props.auth.firstName}! ` : 'Admin!'}</h3>
          <Tabs defaultActiveKey="orders" id="userLoggedIn">
            <Tab eventKey="settings" title="Settings">
              <UserSettings />
            </Tab>
            <Tab eventKey="orderList" title="My Orders">
              <OrderList />
            </Tab>
            <Tab eventKey="users" title="Users">
              <UserManagement />
            </Tab>
            <Tab eventKey="orders" title="Orders">
              <OrderManagement />
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

export default connect(mapState, null)(UserPanel);
