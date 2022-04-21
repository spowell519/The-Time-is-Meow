import React from 'react';
import { Link } from 'react-router-dom'

export const DefaultHeader = () => {
  return (
    <section>
      <div className="highlighted">
        <div><img src="/images/logo.png" /></div>
        <div className="highlighted-text">
          <h1>The Time Is Meow</h1>
          <br />
          <p>Welcome to The Time Is Meow, your home for the timeliest gifts for your furry friends!</p>
          <p>Browse our products by category:&nbsp; <Link to="/category/treat">Treats</Link> • <Link to="/category/toy">Toys</Link> • <Link to="/category/clothing">Clothing</Link></p>
        </div>
      </div>
    </section>
  )
};
