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

  }
  render() {
    console.log('this.state', this.state, 'this.props', this.props);
    return (
      <nav>
        <ul className="left-nav">
          <li><a>Home</a></li>
          <li>
            <select>
              <option value="all"> Categories</option>
              <option value="treat">Treats</option>
              <option value="toy">Toys</option>
              <option value="clothing">Clothing</option>
            </select>
          </li>
        </ul>
        <ul className="right-nav">
          <li>

            {this.props.isLoggedIn ?
              <select>
                <option value="account"> Account</option>
                <option value="logout"> Logout</option>
              </select>
              :
              <select>
                <option value="login"> Login</option>
                <option value="register"> Register</option>
              </select>}

          </li>
          <Link to="/login">
            <li><a>Go</a></li>
          </Link>
          <li><a>Cart</a></li>
        </ul>
      </nav >
    )
  }
}

const mapState = state => {
  return {
    isLoggedIn: !!state.auth.id
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
