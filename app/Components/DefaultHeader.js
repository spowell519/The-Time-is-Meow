import React from 'react';

export const DefaultHeader = (props) => {
  return (
    <section>
      <div className="highlighted">
        <div><img src="/images/logo.png" /></div>
        <div className="highlighted-text">
          <h1>The Time Is Meow</h1>
          <br />
          <p>Welcome to The Time Is Meow, your home for the timeliest gifts for your furry friends!</p>
          <p>Browse our products by category:&nbsp;</p>
        </div>
      </div>
    </section>
  )
};
