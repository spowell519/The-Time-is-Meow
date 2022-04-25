import React from 'react'
import { connect } from 'react-redux'
import { addToCart, fetchCart, removeFromCart } from '../redux/cartReducer'
import Table from 'react-bootstrap/Table';


export const Cart = ({ cart, removeFromCart, addToCart }) => {
  fetchCart()
  const lineItems = cart.lineItems || [];
  let totalPrice = 0
  for(let i=0;i<lineItems.length;i++){
    let itemPrice= lineItems[i].product.price
    totalPrice = totalPrice + Number(itemPrice)*lineItems[i].quantity
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

          {lineItems.map(item => {
            return (
              <tbody key={item.product.title}>
                <tr key={item.product.id}>
                  <td key={`title_${item.product.id}`}>{item.product.title}</td>
                  <td className="big">
                    <button type="button" className="blue" key={`remove_${item.product.id}`} onClick={() => removeFromCart(item.product)}>-</button>
                    &nbsp; {item.quantity} &nbsp;
                    <button type="button" className="blue" key={`add_${item.product.id}`} onClick={() => addToCart(item.product)}>+</button>
                  </td>
                  <td>{item.product.price}</td>
                </tr>
              </tbody>
            )
          })}

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
              <td className="big"><button type="submit" className="blue">Checkout</button></td>
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

const mapDispatch = dispatch => {
  return {
    removeFromCart: (product) => dispatch(removeFromCart(product)),
    addToCart: (product) => dispatch(addToCart(product)),
    fetchCart: () => dispatch(fetchCart())
  }
}

export default connect(mapState, mapDispatch)(Cart)

