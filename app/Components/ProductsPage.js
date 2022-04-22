// Front page view containing header block (intro/feature for user, AddItem for admin) and itemgrid

import React from 'react';
import { connect } from 'react-redux';

import { DefaultHeader } from './DefaultHeader';
import CrupdateProduct from './CrupdateProduct';
import ItemGrid from './ItemGrid';
import { getProducts } from '../redux/productsReducer';


class ProductsPage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      mode: 'add',
      product: {},
      category: '',
    }
    this.editProduct = this.editProduct.bind(this);
    this.handleCategoryChange = this.handleCategoryChange.bind(this);
  }

  editProduct(product, evt) {
    evt.preventDefault();
    this.setState((state) => ({ ...state, mode: 'edit', product }))
  }

  handleCategoryChange(event) {
    this.setState({ category: event.target.value })
  }

  componentDidMount() {
    this.props.getProducts();
  }

  render() {
    const products = this.state.category
      ? this.props.products.filter((product) => product.category === this.state.category)
      : this.props.products;
    console.log({ products, propsProducts: this.props.products, category: this.state.category });
    const isAdmin = this.props.auth.isAdmin;
    return (
      <div>
        <DefaultHeader handleCategoryChange={this.handleCategoryChange} />
        {(isAdmin)
          ? <CrupdateProduct mode={this.state.mode} product={this.state.product} />
          : <div />
        }
        <ItemGrid products={products} editProduct={this.editProduct} category={this.state.category} />
      </div>
    )
  }
}

const mapState = (state) => {
  return {
    products: state.products,
    auth: state.auth,
  };
};

const mapDispatch = (dispatch) => {
  return ({
    getProducts: (category) => dispatch(getProducts(category)),
  })
}

export default connect(mapState, mapDispatch)(ProductsPage);
