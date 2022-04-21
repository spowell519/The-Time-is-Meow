// Front page view containing header block (intro/feature for user, AddItem for admin) and itemgrid

import React from 'react';
import { connect } from 'react-redux';

import { DefaultHeader } from './DefaultHeader';
//import CrupdateProduct from './CrupdateProduct';
import ItemGrid from './ItemGrid';
import { getProducts } from '../redux/productsReducer';


class FrontPage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      category: "all", //  add ability to change with dropdown choice
      admin: false, // just for testing without auth
    }
  }
  componentWillMount() {
    this.props.getProducts("all");
  }

  render() {
    const products = this.props.products || [];

    return (
      <div>
        {/* {(this.state.admin)
        ? <CrupdateProduct />
        : <DefaultHeader />
        } */}
        <ItemGrid products={products} />
      </div>
    )
  }
}

const mapState = (state) => {
  return {
    products: state.products,
  };
};

const mapDispatch = (dispatch) => {
  return (
    {
      getProducts: (category) => dispatch(getProducts(category)),
    })
}

export default connect(mapState, mapDispatch)(FrontPage);
