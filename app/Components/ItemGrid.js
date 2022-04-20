// section in page with a grid of items

import React from 'react';
import { connect } from 'react-redux';

import ItemPreview from './ItemPreview';

class ItemGrid extends React.PureComponent {
  constructor(props) {
    super(props);
  }
  render() {
    const products = this.props.products || [];

    return (
      <section>
        <h2>Our Products</h2>
        <div id="all-products">
          {products.map(product => <ItemPreview key={`product_${product.id}`} product={product} />)}
        </div>
      </section>
    )
  }
}

export default ItemGrid;
