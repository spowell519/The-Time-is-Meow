import React from 'react';
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom';

import Navbar from './navbar'
import FrontPage from './FrontPage';

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
