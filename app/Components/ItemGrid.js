// section in page with a grid of items

import React from 'react';
import { connect } from 'react-redux';

import ItemPreview from './ItemPreview';

class ItemGrid extends React.PureComponent {
  constructor(props) {
    super(props);
  }
  render() {
    const items = this.props.itemList || [];

    return (
      <section>
        <h2>Our Products</h2> // change val if using off main page
          <div id="all-products">
          items.map(item => <ItemPreview key="{`item_${item.id}`}" item={item} />
          </div>
      </section>
    )
  }
}

export default ItemGrid;
