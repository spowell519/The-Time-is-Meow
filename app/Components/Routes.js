import React from 'react';
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom';

import Navbar from './Navbar'
import FrontPage from './FrontPage'
import Login from './Login'

const Routes = () => {
  return (
    <Router>
      <main>
        <Navbar />
        <Route exact path="/" component={FrontPage} />
        <Route exact path="/login" component={Login} />
      </main>
    </Router>
  );
};

export default Routes;

