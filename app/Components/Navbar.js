import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Login from './LoginForm';
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
  componentDidUpdate(){
    if(this.props.isLoggedIn){
      this.props.fetchCart();
    }
  }
  handleChange(e){
    if (e.target.value !== ''){
      this.setState({authOption: e.target.value})
    }
  }
  // eslint-disable-next-line complexity
  render() {
    console.log('this.state', this.state);
     console.log('auth?', this.props.auth)
    return (
      <nav>
        <ul className="left-nav">
          <li><Link to="/">Home</Link></li>
          <li>Welcome{(this.props.auth.firstName) ? ` back, ${this.props.auth.firstName}`  : ""}!</li>
        </ul>
        <ul className="right-nav">
          <li>

            {this.props.isLoggedIn ?
              <select onChange={this.handleChange}>
                <option> </option>
                <option value="logout"> Logout</option>
                <option value="account"> Account</option>
              </select>
              :
              <select onChange={this.handleChange}>
                <option> </option>
                <option value="login"> Login</option>
                <option value="register"> Register</option>
              </select>}

          </li>

          {!this.props.isLoggedIn && this.state.authOption === 'login'
            ?
            <Link to="/login">
              <li>Go</li>
            </Link>
            : (!this.props.isLoggedIn && this.state.authOption === 'register')
            ?
            <Link to="/register">
              <li>Go</li>
            </Link>
            : (this.props.isLoggedIn && this.state.authOption === 'account')
            ?
            <Link to="/account">
              <li>Go</li>
            </Link>
            : <li><a href="/" onClick={this.props.handleClick}>Go</a></li>
            }

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
    fetchCart: () => dispatch(fetchCart)
  }
}

export default connect(mapState, mapDispatch)(Navbar);
