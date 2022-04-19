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
        <h2>Our Products</h2>
        <div id="all-products">
          {items.filter(item => {
            if (item.inventory > 0)
              return (<ItemPreview key="{`item_${item.id}`}" item={item} />)
          })}
        </div>
      </section>
    )
  }
}

export default ItemGrid;
