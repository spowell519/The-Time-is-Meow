import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { me, logout } from '../redux/authReducer';
import { fetchCart } from '../redux/cartReducer';

class Navbar extends React.PureComponent {
  constructor(props) {
    super(props);
    // look in localstorage to stay logged in
    this.props.stayLoggedIn();
    this.state =
      { authOption: '' };
    this.handleChange = this.handleChange.bind(this)
    this.totalItemsInCart = this.totalItemsInCart.bind(this)
  }
  componentDidMount(){
    this.props.fetchCart()
  }
  //DO NOT PUT FETCHCART IN COMPONENTDIDUPDATE, it creates an infinite loop
  handleChange(e){
    if (e.target.value !== ''){
      this.setState({authOption: e.target.value})
    }
  }
  totalItemsInCart() {
    for (let i=0; i < this.props.cart.length; i++) {
      console.log(`[${i}]`, this.props.cart[i].quantity, this.props.cart[i].product.title)
    }
    return (this.props.cart.length)
      ? this.props.cart.reduce((acc, product) => acc + (product.quantity), 0)
      : 0
  }

  // eslint-disable-next-line complexity
  render() {
    const cartQuantity = this.totalItemsInCart();

    return (
      <nav>
        <ul className="left-nav">
          <li><Link to="/"><img src="/images/home.png" alt="home" /></Link></li>
        </ul>

        <ul className="right-nav">
          <li><Link to="/account">Account</Link></li>
          {(this.props.auth.id) ? <li><Link to="/" onClick={this.props.logout}>Log Out</Link></li> : ""}
          <li><Link to="/cart">{cartQuantity} <img src="/images/cart.png" alt="cart" /></Link></li>
        </ul>
      </nav>
    )
  }
}

const mapState = state => {
  return {
    isLoggedIn: !!state.auth.id,
    auth: state.auth,
    cart: state.cart,
  }
}

const mapDispatch = (dispatch, history) => {
  return {
    logout: () => dispatch(logout(history)),
    stayLoggedIn: () => dispatch(me()),
    fetchCart: () => dispatch(fetchCart()),
  }
};

export default connect(mapState, mapDispatch)(Navbar);
