// section in page with a grid of items
import React from 'react';

import ItemPreview from './ItemPreview';

const ItemGrid = (props) => {
  const products = (props) ? props.products : [];
  const edit = (props) ? props.editProduct : [];

  const category = props.category.slice(0, 1).toUpperCase() + props.category.slice(1);

  return (
    <section>
      <h2>Our {category ? category : "Product"}{(products.length > 1 && category !== 'clothing') ? 's' : ''}</h2>
      <div id="all-products">
        {products.map(product => <ItemPreview key={`product_${product.id}`} product={product} edit={edit} />)}
      </div>
    </section>
  )
}

export default ItemGrid;
