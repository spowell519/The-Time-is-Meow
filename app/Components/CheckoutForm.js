import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';
import { useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js";
// import React from 'react';
import {fetchCart} from '../redux/cartReducer';

const ProductDisplay = ({fetchCart}) => {
  useEffect(() => {fetchCart()}, []);
  const lineItems = cart.sort((a, b) => a.product.title.localeCompare(b.product.title)) || [];

  return (
    <section>
    {lineItems.map(item => {
      return (
        <div className="product" key={item.product.id}>
          <img
            src={item.product.imageUrl}
            alt={item.product.title}
          />
          <div className="description">
          <h3>{item.product.title}</h3>
          <h5>{item.product.price}</h5>
          </div>
        </div>
      )
    })}
    <form action="/create-checkout-session" method="POST">
      <button type="submit">
        Checkout
      </button>
    </form>
    </section>
  )
};

const mapDispatch = dispatch => {
  return {
    fetchCart: () => dispatch(fetchCart()),
  }
};

export connect(null, mapDispatch)(ProductDisplay)

const Message = ({ message }) => (
  <section>
    <p>{message}</p>
  </section>
);

export default function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);

    if (query.get("success")) {
      setMessage("Order placed! You will receive an email confirmation.");
    }

    if (query.get("canceled")) {
      setMessage(
        "Order canceled -- continue to shop around and checkout when you're ready."
      );
    }
  }, []);

  return message ? (
    <Message message={message} />
  ) : (
    <ProductDisplay />
  );
}
