import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Login from './LoginForm';
import { logout } from '../redux/authReducer';

class Navbar extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state =
      { authOption: 'login' };
    this.handleChange = this.handleChange.bind(this)
  }
  handleChange(e) {
    this.setState({ authOption: e.target.value })
  }
  render() {
    console.log('this.state', this.state);
    return (
      <nav>
        <ul className="left-nav">
          <Link to='/'>
            <li><a>Home</a></li>
          </Link>
          <li>
            <select>
              <option value="all"> Categories</option>
              <option value="treat">Treat</option>
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
          {!this.props.isLoggedIn && this.state.authOption === 'login'
            ?
            <Link to="/login">
              <li><a>Go</a></li>
            </Link>
            :
            <Link to="/register">
              <li><a>Go</a></li>
            </Link>
          }

          <li><a>Cart</a></li>
        </ul>
      </nav>
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
