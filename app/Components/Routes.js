import React from 'react';
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom';

import Navbar from './Navbar'
import FrontPage from './FrontPage' //this isn't breaking anything, not sure why

const Routes = () => {
  return (
    <Router>
      <main>
        <Navbar />
        <Route exact path="/" component={FrontPage} />
      </main>
    </Router>
  );
};

export default Routes;
