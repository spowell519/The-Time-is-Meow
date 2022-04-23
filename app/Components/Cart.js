import React from 'react'
import { connect } from 'react-redux'

class Cart extends React.Component {
  constructor(props) {
    super(props)
    this.handleRemove = this.handleRemove.bind(this)
  }
  handleRemove(e){
    console.log(e, 'click event')
    this.props.removeFromCart(e.product)
  }

  render(){
    console.log(this.props, 'this.props in cart')
    const lineItems = this.props.cart.lineItems
    console.log(lineItems, 'cart lineItems')
    let itemCounter = 0
    // let totalPrice
    // console.log(totalPrice, 'total Price')
    return(
      <div>
        <h3>Your Cart</h3>
        <div>
        {lineItems ? lineItems.map(item => {
          {itemCounter++}
          return (
            <div key={itemCounter}>
            {/* not sure what's up with the imageUrls */}
            <img src={item.product.imageUrl}/>
            <div>Product: {item.product.title}</div>
            <div>Price: ${item.product.price}</div>

            <button onClick={this.handleRemove(item)}>-</button>
            <div>Quantity: {item.quantity}</div>
            <button>+</button>
          </div>
          )
        }): "There's nothing here yet! Check out some of our wonderful selection!" }
        </div>
      </div>
    )
  }
}

const mapState = (state) => {
  return {
    cart: state.cart,
  }
}

const mapDispatch = dispatch => {
  return {
    //fetchCart: () => dispatch(fetchCart()),
    removeFromCart: (product) => console.log(product)
  }
}

export default connect(mapState, mapDispatch)(Cart)


