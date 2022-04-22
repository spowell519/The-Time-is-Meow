import React from 'react';
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom';

import CategoryPage from './CategoryPage'
import Navbar from './Navbar'
import FrontPage from './FrontPage'
import ProductPage from './ProductPage'
import Login from './LoginForm'
import Cart from './Cart';

const Routes = () => {
  return (
    <Router>
      <main>
        <Navbar />
        <Route exact path="/" component={FrontPage} />
        <Route exact path="/product/:id" component={ProductPage} />
        <Route exact path="/category/:category" component={CategoryPage} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/cart" component={Cart} />
      </main>
    </Router>
  );
};

export default Routes;

