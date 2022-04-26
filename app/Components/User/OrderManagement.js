import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Table from 'react-bootstrap/Table';

import { getOrdersAdmin } from '../../redux/ordersAdminReducer';

export const OrderManagement = ({ordersAdmin, fetchOrders}) => {
  useEffect(() => {fetchOrders()}, []);
  const allOrders = ordersAdmin.sort((a, b) => a.id - b.id) || [];

  return (
    <Table borderless hover>
      <thead>
        <tr>
          <th>Order #</th>
          <th>Email</th>
          <th className="right">Total</th>
          <th>Order Date</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {allOrders.map(order => {
          const user = order.user || {}
          return (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{user.email}</td>
              <td className="right">${order.price}</td>
              <td>{order.date}</td>
              <td>{order.status}</td>
            </tr>
          )
        })}
      </tbody>
    </Table>
  )
}


const mapState = (state) => {
  return {
    ordersAdmin: state.ordersAdmin,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchOrders: () => dispatch(getOrdersAdmin()),
  }
}

export default connect(mapState, mapDispatch)(OrderManagement);
