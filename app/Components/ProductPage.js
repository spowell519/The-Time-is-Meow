import React from 'react';
import { connect } from 'react-redux';

import CrupdateProduct from './CrupdateProduct';
import SingleProduct from './SingleProduct';
import ItemGrid from './ItemGrid';

import { getProduct } from '../redux/productReducer';
import { getProducts } from '../redux/productsReducer';

class ProductPage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      admin: true, // just for testing without auth
    }
    this.props.getProduct(this.props.match.params.id);
  }

  componentDidMount() {
    if (this.props.product.category) this.props.getProducts(this.props.product.category)
  }

  render() {
    const product = this.props.product || {};
    const relatedProducts = this.props.products || [];

    return (
      <div>
        <SingleProduct mode="edit" product={product} />

        {(this.state.admin)
        ? <CrupdateProduct mode="edit" product={product} />
        : <div /> }
      </div>
    )
  }
}

const mapState = (state) => {
  return {
    product: state.product,
    products: state.products,
  };
};

const mapDispatch = (dispatch) => {
  return (
    {
      getProduct: (id) => dispatch(getProduct(id)),
      getProducts: (category) => dispatch(getProducts(category)),
    })
}

export default connect(mapState, mapDispatch)(ProductPage);
