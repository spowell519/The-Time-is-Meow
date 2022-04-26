import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Navbar from './Navbar'
import ProductsPage from './Product/ProductsPage'
import ProductPage from './Product/ProductPage'
import CategoryPage from './Product/CategoryPage'
// import Login from './LoginForm'
import Cart from './Cart';
import AccountPage from './User/AccountPage'
import InjectedCheckoutForm from '../Components/CheckoutForm';

const Routes = (props) => {
  return (
    <Router>
      <main>
        <Navbar />
        <Route exact path="/" component={ProductsPage} />
        <Route exact path="/product/:id" component={ProductPage} />
        <Route exact path="/category/:id" component={CategoryPage} />
        <Route exact path="/account" component={AccountPage} />
        <Route exact path="/cart" component={Cart} />
        <Route exact path="/checkout" component={props.auth && props.auth.id ? InjectedCheckoutForm : AccountPage} />
      </main>
    </Router>
  );
};

const mapState = (state) => {
  return {
    auth: state.auth,
  }
}

export default connect(mapState, null)(Routes)

