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
    console.log('this.state navbar', this.state);
    console.log(this.props, 'this.props navbar')
    console.log('auth?', this.props.auth)

    return (
      <nav>
        <ul className="left-nav">
          <li><Link to="/">Home</Link></li>
          <li>Welcome{(this.props.auth.firstName) ? ` back ${this.props.auth.firstName}`  : ""}!</li>
        </ul>
        <ul className="right-nav">
          <li><Link to="/account">Account</Link></li>
          <li><Link to="/cart">Cart</Link></li>
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

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    },
    stayLoggedIn: () => dispatch(me()),
    fetchCart: () => dispatch(fetchCart())
  }
}

export default connect(mapState, mapDispatch)(Navbar);
