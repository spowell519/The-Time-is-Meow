import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Navbar from './Navbar'
import ProductsPage from './ProductsPage'
import ProductPage from './ProductPage'
import CategoryPage from './CategoryPage'
// import Login from './LoginForm'
import Cart from './Cart';
import AccountPage from './User/AccountPage'

const Routes = () => {
  return (
    <Router>
      <main>
        <Navbar />
        <Route exact path="/" component={ProductsPage} />
        <Route exact path="/product/:id" component={ProductPage} />
        <Route exact path="/category/:id" component={CategoryPage} />
        {/* <Route exact path="/login" component={Login} /> */}
        <Route exact path="/account" component={AccountPage} />
        <Route exact path="/cart" component={Cart} />
      </main>
    </Router>
  );
};

export default Routes;

