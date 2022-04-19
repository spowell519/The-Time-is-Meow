// Front page view containing header block (intro/feature for user, AddItem for admin) and itemgrid

import React from 'react';
import { connect } from 'react-redux';

import ItemGrid from './ItemGrid';
import getItems from '../redux/itemReducer';


class FrontPage extends React.PureComponent {
  constructor(props) {
    super(props);
    console.log('constructor')
    this.state = {
      category: "all", //  add ability to change with dropdown choice
      // admin: false, // just testing before we add admin's add item feature
    }
  }

  componentWillMount() {
    // this.props.getItems(this.state.category);
  }

  render() {
    console.log('props', this.props)
    const items = this.state.itemList || [];

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
        <ItemGrid items={items} />
      </div>
    )
  }
}

const mapState = (state) => {
  return {
    itemList: state.items,
  };
};

const mapDispatch = (dispatch) => {
  console.log('THis is mapDispatch');
  return (
    {
      getItems: (category) => dispatch(getItems(category)),
    })
}

export default connect(mapState, mapDispatch)(FrontPage);
