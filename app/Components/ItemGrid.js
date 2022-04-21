// section in page with a grid of items
import React from 'react';

import ItemPreview from './ItemPreview';

const ItemGrid = (props) => {
    const products = (props) ? props.products : [];
    const edit = (props) ? props.editProduct : [];

    return (
      <section>
        <h2>Our Products</h2>
        <div id="all-products">
          {products.map(product => <ItemPreview key={`product_${product.id}`} product={product} edit={edit} />)}
        </div>
      </section>
    )
}

export default ItemGrid;
