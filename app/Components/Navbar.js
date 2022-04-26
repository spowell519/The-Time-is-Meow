import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

import { me, logout } from '../redux/authReducer';
import { fetchCart } from '../redux/cartReducer';
import { getCategories } from '../redux/categoryReducer';

class Navbar extends React.PureComponent {
  constructor(props) {
    super(props);
    // look in localstorage to stay logged in
    this.props.stayLoggedIn();

    this.state =
      { authOption: '' };
    this.handleChange = this.handleChange.bind(this)
    this.props.getCategories();
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
    const tags = this.props.categories || []

    return (
      <nav>
        <ul className="left-nav">
          <li><Link to="/"><img src="/images/home.png" alt="home" /></Link></li>
          <li>
            <DropdownButton className="filter" id="dropdown-basic-button" title="Filter">
            {tags.map(tag => {
              return (<Dropdown.Item key={tag} href={`/category/${tag}`}>{tag}</Dropdown.Item>
              )
            })}
            </DropdownButton>

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
    categories: state.categories,
  }
}

const mapDispatch = (dispatch, history) => {
  return {
    logout: () => dispatch(logout(history)),
    stayLoggedIn: () => dispatch(me()),
    fetchCart: () => dispatch(fetchCart()),
    getCategories: () => dispatch(getCategories()),    
  }
};

export default connect(mapState, mapDispatch)(Navbar);
