import React from 'react'
import { connect } from 'react-redux'

class Cart extends React.Component {
  constructor(props) {
    super(props)
  }

  render(){
    const lineItems = this.props.cart.lineItems
    console.log(lineItems, 'cart lineItems')
    return(
      <div>
        placeholder text
        {/* {lineItems.map(lineItem => {
          <div key={[lineItem.orderId, lineItem.productId]}>
            <img src={lineItem.product.imageUrl}/>
            <div>{lineItem.product.title}</div>
            <div>{lineItem.product.price}</div>

            <button>-</button>
            <div>{lineItem.quantity}</div>
            <button>+</button>
          </div>
        })} */}
        <div className='singleCartItem'>
          <img src='default.png'/>
          <div>Product Name</div>
          <div>Product Price</div>

          {/* this half will need some formatting --> */}
          <button>-</button>
          <div>Product Quantity</div>
          <button>+</button>
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


