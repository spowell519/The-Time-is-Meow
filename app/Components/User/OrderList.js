import React from 'react';
import { connect } from 'react-redux';
import Table from 'react-bootstrap/Table';

import { getOrders } from '../../redux/ordersReducer';

export const OrderList = ({orders, getOrders}) => {
  // getOrders()
  const orderList = orders || []
  // console.log('orders', orderList)
  return (
    <Table borderless hover>
      <thead>
        <tr>
          <th>Order Number</th>
          <th>Order Date</th>
          <th>Total</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {/* {orderList.map(order => {
          return (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.date}</td>
              <td>{order.price}</td>
              <td>{order.status}</td>
            </tr>
          )
        })} */}
      </tbody>
    </Table>
  )
}


const mapState = (state) => {
  return {
    orders: state.orders,
  };
};

const mapDispatch = (dispatch) => {
  return {
    getOrders: () => dispatch(getOrders()),
  }
}

export default connect(mapState, mapDispatch)(OrderList);
