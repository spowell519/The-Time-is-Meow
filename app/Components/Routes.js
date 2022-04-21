import React from 'react';
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom';

import Navbar from './Navbar'
import FrontPage from './FrontPage'
import ProductPage from './ProductPage'
import Login from './LoginForm'

const Routes = () => {
  return (
    <Router>
      <main>
        <Navbar />
        <Route exact path="/" component={FrontPage} />
        <Route exact path="/product/:id" component={ProductPage} />
        <Route exact path="/login" component={Login} />
      </main>
    </Router>
  );
};

export default Routes;

