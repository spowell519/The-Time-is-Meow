import React from 'react'
import { connect } from 'react-redux'

class Cart extends React.Component {
  constructor(props) {
    super(props)
  }

  render(){
    console.log(this.props)
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
    //currently undefined, will be messing with it in backend
    orders: state.orders,
  }
}

export default connect(mapState)(Cart)
