import React from 'react'
import { connect } from 'react-redux'
import { addToCart, fetchCart, removeFromCart } from '../redux/cartReducer'


export const Cart = ({ cart, removeFromCart, addToCart }) => {
  fetchCart()
  const lineItems = cart.lineItems || [];
  let totalPrice = 0
  for(let i=0;i<lineItems.length;i++){
    let itemPrice= lineItems[i].product.price
    totalPrice = totalPrice + Number(itemPrice)*lineItems[i].quantity
  }

  return (
    <div>
      <ul><strong>Items in Cart: </strong>
        {lineItems.map(item => {
          return (
            <li key={item.product.id}>
              Product: {item.product.title}
              <br />
              Price: ${item.product.price}
              <br />
              <button onClick={() => removeFromCart(item.product)}>-</button>
              Quantity: {item.quantity}
              <button onClick={() => addToCart(item.product)}>+</button>
            </li>
          )
        })}
      </ul>
      <br />
      <br />
      <h5>Total Price: ${totalPrice.toFixed(2)}</h5>
      <button>Checkout</button>
    </div>
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

