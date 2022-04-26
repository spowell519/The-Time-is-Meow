// section in page with a grid of items
import React from 'react';

import ItemPreview from './ItemPreview';

const ItemGrid = (props) => {
  const products = (props) ? props.products : [];
  const edit = (props) ? props.editProduct : [];

  const PRODUCT = (products.length === 1) ? 'Product' : 'Products'
  return (
    <section>
      <h2>{(props.category) ? `Our ${PRODUCT} tagged 	\u275D ${props.category} \u275E` : `Our ${PRODUCT}` }</h2>
      <div id="all-products">
        {products.map(product => <ItemPreview key={`product_${product.id}`} product={product} edit={edit} />)}
      </div>
    </section>
  )
}

export default ItemGrid;
