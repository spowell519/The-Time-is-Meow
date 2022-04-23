import React from 'react'
import { connect } from 'react-redux'

class Cart extends React.Component {
  constructor(props) {
    super(props)
  }

  render(){
    const lineItems = this.props.cart.lineItems
    console.log(lineItems, 'cart lineItems')
    let itemCounter = 0
    return(
      <div>
        <h3>Your Cart</h3>
        <div>
        {lineItems ? lineItems.map(item => {
          {itemCounter++}
          return (
            <div key={itemCounter}>

            <img src={item.product.imageUrl}/>
            <div>{item.product.title}</div>
            <div>{item.product.price}</div>

            <button>-</button>
            <div>{item.quantity}</div>
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


