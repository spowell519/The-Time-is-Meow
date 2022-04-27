import { useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js";
import React from 'react';


export const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if(!stripe || !elements) {
      return;
    }

    const result = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: '/account'
      }
    });

    if (result.error) {
      console.log(result.error.message);
    } else {
      //this sends it to return_url?
    }
  };

  return (
    <section>
      <div className="highlighted">
      <div><img src="/images/logo.png" /></div>
        <div className="highlighted-text">
          <h1>Checkout</h1>
          <form onSubmit={handleSubmit}>
            <PaymentElement />
            <button disabled={!stripe}>Submit</button>
          </form>
        </div>
      </div>
    </section>
  )
}

