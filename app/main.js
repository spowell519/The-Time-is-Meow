
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'

import store from './store'
import Routes from './Components/Routes'
import 'bootstrap/dist/css/bootstrap.min.css';

render(
  <Provider store={store}>
    <Routes />
  </Provider>,
  document.getElementById('app')
)
