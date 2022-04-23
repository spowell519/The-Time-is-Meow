import React from 'react'
import { connect } from 'react-redux'
import { fetchCart } from '../redux/cartReducer'

class Cart extends React.Component {
  constructor(props) {
    super(props)
    // this.state = {
    //   cart: {}
    // }
  }
  componentDidMount(){
    this.props.fetchCart()
  }

  render(){
    console.log(this.props, "props", this.state, "state")
    return(
      <div>
        placeholder text
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
    orders: state.orders,
  }
}

const mapDispatch = dispatch => {
  return {
    fetchCart: () => dispatch(fetchCart())
  }
}

export default connect(mapState, mapDispatch)(Cart)
