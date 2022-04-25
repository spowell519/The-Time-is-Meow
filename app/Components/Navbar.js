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
  // eslint-disable-next-line complexity
  render() {
    return (
      <nav>
        <ul className="left-nav">
          <li><Link to="/"><img src="/images/home.png" alt="home" /></Link></li>
          <li>
          {
            (this.props.auth.id)
            ? `Welcome back ${(this.props.auth.firstName) ? this.props.auth.firstName : ''}!`
            : ""
          }
          </li>
        </ul>
        <ul className="right-nav">
          <li><Link to="/account">Account</Link></li>
          {(this.props.auth.id) ? <li><Link to="/" onClick={this.props.logout}>Log Out</Link></li> : ""}
          <li><Link to="/cart"><img src="/images/cart.png" alt="cart" /></Link></li>
        </ul>
      </nav>
    )
  }
}

const mapState = state => {
  return {
    isLoggedIn: !!state.auth.id,
    auth: state.auth,
  }
}

const mapDispatch = (dispatch, history) => {
  return {
    logout: () => dispatch(logout(history)),
    stayLoggedIn: () => dispatch(me()),
    fetchCart: () => dispatch(fetchCart())
  }
};

export default connect(mapState, mapDispatch)(Navbar);
