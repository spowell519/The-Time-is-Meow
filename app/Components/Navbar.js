import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Login from './Login'

class Navbar extends React.PureComponent {
  constructor(props) {
    super(props);
  }
  render() {
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
            <select>
              <option value="all"> Account</option>
              {/* <option value="login"><Link to={Login}>"Log In"</Link></option> */}
              <option value="register">Register</option>
            </select>
          </li>
          <li><a>Cart</a></li>
        </ul>
      </nav>
    )
  }
}

export default Navbar;
