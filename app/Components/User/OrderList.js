import React from 'react';
import { connect } from 'react-redux';

/* what does this need?
  * pull all orders associated with user
*/

const OrderList = (props) => {
  return (
    <ul>
      <li>Order 1</li>
      <li>Order 2</li>
      <li>Order 3</li>
      <li>Order 4</li>
    </ul>
  )
}


const mapState = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapState, null)(OrderList);
