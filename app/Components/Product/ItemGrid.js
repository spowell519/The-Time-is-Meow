// section in page with a grid of items
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

import ItemPreview from './ItemPreview';
import { getCategories } from '../../redux/categoryReducer';

const ItemGrid = (props) => {
  const products = (props) ? props.products : [];
  const edit = (props) ? props.editProduct : [];

  const PRODUCT = (products.length === 1) ? 'Product' : 'Products'
  const tags = props.categories || []
  useEffect(() => {getCategories()}, [])
  return (
    <section>
      <div className="grid-header">
        <div>
          <h2>{(props.category) ? `Our ${PRODUCT} tagged 	\u275D ${props.category} \u275E` : `Our ${PRODUCT}` } </h2>
        </div>
        <div className="right">
        {(!props.category)
        ?
          <DropdownButton className="filter" id="dropdown-basic-button" title="Filter">
              {tags.map(tag => {
                return (<Dropdown.Item key={tag} href={`/category/${tag}`}>{tag}</Dropdown.Item>
                )
              })}
          </DropdownButton>
        : <div />
        }
        
        </div>
      </div>
      <div id="all-products">
        {products.map(product => <ItemPreview key={`product_${product.id}`} product={product} edit={edit} />)}
      </div>
    </section>
  )
}
const mapState = state => {
  return {
    categories: state.categories,
  }
}

const mapDispatch = (dispatch) => {
  return {
    getCategories: () => dispatch(getCategories()),
  }
};

export default connect(mapState, mapDispatch)(ItemGrid);
