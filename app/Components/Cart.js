import React from 'react'
import { connect } from 'react-redux'
import { addToCart, fetchCart, removeFromCart } from '../redux/cartReducer'


export const Cart = ({ cart, removeFromCart, addToCart }) => {
  fetchCart()
  const lineItems = cart.lineItems || [];
  console.log(lineItems)
  let totalPrice = 0
  for(let i=0;i<lineItems.length;i++){
    let itemPrice= lineItems[i].product.price
    console.log(itemPrice, 'indiv itemPrice')
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

// class Cart extends React.Component {
//   constructor(props) {
//     super(props)
//     this.handleRemove = this.handleRemove.bind(this)
//   }
//   handleRemove(item, e){
//     console.log('click event', item)
//     this.props.removeFromCart()
//   }

//   render(){
//     console.log(this.props, 'this.props in cart')
//     const lineItems = this.props.cart.lineItems
//     console.log(lineItems, 'cart lineItems')
//     let itemCounter = 0
//     // let totalPrice
//     // console.log(totalPrice, 'total Price')
//     return(
//       <div>
//         <h3>Your Cart</h3>
//         <div>
//         {lineItems ? lineItems.map(item => {
//           {itemCounter++}
//           return (
//             <div key={itemCounter}>
//             {/* not sure what's up with the imageUrls */}
//             <img src={item.product.imageUrl}/>
//             <div>Product: {item.product.title}</div>
//             <div>Price: ${item.product.price}</div>

//             <button value={item} onClick={this.handleRemove(item.product)}>-</button>
//             <div>Quantity: {item.quantity}</div>
//             <button>+</button>
//           </div>
//           )
//         }): "There's nothing here yet! Check out some of our wonderful selection!" }
//         </div>
//       </div>
//     )
//   }
// }
