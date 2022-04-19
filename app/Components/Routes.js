import React from 'react';
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom';

import Navbar from './navbar'
import FrontPage from './FrontPage';

const Routes = () => {
  return (
    <Router>
      <main>
        <Navbar />
        <main>
          <Route exact path="/" component={FrontPage} />
        </main>
      </main>
    </Router>
  );
};

export default Routes;
