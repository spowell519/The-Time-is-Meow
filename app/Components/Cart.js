import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { addToCart, fetchCart, removeFromCart, checkoutCart } from '../redux/cartReducer';
import Table from 'react-bootstrap/Table';


export const Cart = ({ history, cart, removeFromCart, addToCart, fetchCart, checkoutCart }) => {
  useEffect(() => {fetchCart()}, []);
  const lineItems = cart.sort((a, b) => a.product.title.localeCompare(b.product.title)) || [];

  let totalPrice = 0
  for (let i = 0; i < lineItems.length; i++) {
    let itemPrice = lineItems[i].product.price
    totalPrice = totalPrice + Number(itemPrice) * lineItems[i].quantity
  }
  return (
    <section>
      <div className="highlighted">
        <div className="left">
          <img src="/images/logo.png" />
        </div>

        <div className="info">
          <Table borderless>
            <thead>
              <tr>
                <td>Product</td>
                <td>Quantity</td>
                <td>Price</td>
              </tr>
            </thead>

            <tbody>
              {lineItems.map(item => {
                return (
                  <tr key={item.product.id}>
                    <td key={`title_${item.product.id}`}>{item.product.title}</td>
                    <td className="big">
                      <button type="button" className="blue" key={`remove_${item.product.id}`} onClick={() => removeFromCart(item.product)}>-</button>
                      &nbsp; {item.quantity} &nbsp;
                      <button type="button" className="blue" key={`add_${item.product.id}`} onClick={() => addToCart(item.product)}>+</button>
                    </td>
                    <td>{(item.product.price * item.quantity).toFixed(2)}</td>
                  </tr>
                )
              })}
            </tbody>

            <thead>
              <tr>
                <td colSpan="2"> </td>
                <td className="big">Subtotal</td>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td colSpan="2"> </td>
                <td className="big">${totalPrice.toFixed(2)}</td>
              </tr>
            </tbody>

            <thead>
              <tr>
                <td colSpan="2"> </td>
                <td className="big">
                  <button
                    onClick={() => checkoutCart(totalPrice.toFixed(2))} type="submit" className="blue">
                    Checkout
                  </button>
                </td>
              </tr>
            </thead>

          </Table>
        </div>
      </div>
    </section>
  )
}

const mapState = (state) => {
  return {
    cart: state.cart,
  }
}

const mapDispatch = (dispatch, history) => {
  return {
    removeFromCart: (product) => dispatch(removeFromCart(product)),
    addToCart: (product) => dispatch(addToCart(product)),
    fetchCart: () => dispatch(fetchCart()),
    checkoutCart: (total) => dispatch(checkoutCart(total, history))

  }
}

export default connect(mapState, mapDispatch)(Cart)

