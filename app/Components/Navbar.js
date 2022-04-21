import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Login from './LoginForm';
import { logout } from '../redux/authReducer';

class Navbar extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state =
      { authOption: '' };
    this.handleChange = this.handleChange.bind(this)
  }
  handleChange(e){
    if (e.target.value !== ''){
      this.setState({authOption: e.target.value})
    }
  }
  // eslint-disable-next-line complexity
  render() {
    console.log('this.state', this.state);
    return (
      <nav>
        <ul className="left-nav">
          <li><Link to="/">Home</Link></li>
          <li>Welcome{(this.props.isLoggedIn) ? " back" : ""}!</li>
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

          <li><a>Cart</a></li>
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
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar);
