import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Navbar from './Navbar'
import ProductsPage from './ProductsPage'
import ProductPage from './ProductPage'
import Login from './LoginForm'
import Cart from './Cart';

const Routes = () => {
  return (
    <Router>
      <main>
        <Navbar />
        <Route exact path="/" component={ProductsPage} />
        <Route exact path="/product/:id" component={ProductPage} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/cart" component={Cart} />
      </main>
    </Router>
  );
};

export default Routes;

