import React from 'react';
import { connect } from 'react-redux';
import Table from 'react-bootstrap/Table';

const OrderList = (props) => {
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
        <tr>
          <td>1011</td>
          <td>4/20/2022</td>
          <td>$420.00</td>
          <td>Unfulfilled</td>
        </tr>
        <tr>
          <td>1006</td>
          <td>3/10/2022</td>
          <td>$37.89</td>
          <td>Shipped</td>
        </tr>
        <tr>
          <td>1003</td>
          <td>2/08/22</td>
          <td>$10.80</td>
          <td>Shipped</td>
        </tr>
      </tbody>
    </Table>
  )
}


const mapState = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapState, null)(OrderList);
