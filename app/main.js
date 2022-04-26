
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'

import store from './store'
import Routes from './Components/Routes'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx')

function App() {
  const options = {
    clientSecret: '{{CLIENT_SECRET}}'
  }
}

render(
  <Provider stripe={stripePromise} store={store}>
    <Routes />
  </Provider>,
  document.getElementById('app')
)
