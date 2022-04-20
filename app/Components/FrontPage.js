// Front page view containing header block (intro/feature for user, AddItem for admin) and itemgrid

import React from 'react';
import { connect } from 'react-redux';

import ItemGrid from './ItemGrid';
import { getItems } from '../redux/itemReducer';


class FrontPage extends React.PureComponent {
  constructor(props) {
    super(props);
    // this.state = {
    //   category: "all", //  add ability to change with dropdown choice
    //   // admin: false, // just testing before we add admin's add item feature
    // }
  }
  componentWillMount() {
    this.props.getItems("all");
  }

  render() {
    const products = this.props.products || [];

    return (
      <div>
        <section>
          <div id="intro">
            <div><img src="images/logo.png" /></div>
            <div id="intro-text">
              <h1>The Time Is Meow</h1>
              <br />
              <p>Welcome to The Time Is Meow, your home for the timeliest gifts for your furry friends!</p>
            </div>
          </div>
        </section>
        <ItemGrid products={products} />
      </div>
    )
  }
}

const mapState = (state) => {
  return {
    products: state.items,
  };
};

const mapDispatch = (dispatch) => {
  return (
    {
      getItems: (category) => dispatch(getItems(category)),
    })
}

export default connect(mapState, mapDispatch)(FrontPage);
