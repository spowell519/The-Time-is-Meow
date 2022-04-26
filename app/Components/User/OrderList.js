import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Table from 'react-bootstrap/Table';

import { getOrders } from '../../redux/ordersReducer';

export const OrderList = ({orders, fetchOrders}) => {
  useEffect(() => {fetchOrders()}, []);
  const myOrders = orders || [];

  return (
    <Table borderless hover>
      <thead>
        <tr>
          <th>Order Number</th>
          <th className="right">Total</th>
          <th>Order Date</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {myOrders.map(order => {
          return (
            <tr key={order.id}>
              <td>{order.id}</td>
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
    orders: state.orders,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchOrders: () => dispatch(getOrders()),
  }
}

export default connect(mapState, mapDispatch)(OrderList);
