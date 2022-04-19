// Front page view containing header block (intro/feature for user, AddItem for admin) and itemgrid

import React from 'react';
import { connect } from 'react-redux';

import ItemGrid from './ItemGrid';
import {items} from '../redux/data'

class FrontPage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      category: all, // TODO add ability to change with dropdown choice
      admin: false, // just testing before we add admin's add item feature
    }
  }
  
  componentDidMount() {
    // getItems(this.state.category);
    this.setState({itemList:items});
  }
  
  render() {
    const items = this.state.itemList || [];

    return (
    <div>
      <section>
        <div id="intro">
          <div><img src="logo.png" /></div>
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

const mapDispatch = (dispatch) => ({
  getItems: (category) => dispatch(getItems(category)),
})

export default ItemGrid;
