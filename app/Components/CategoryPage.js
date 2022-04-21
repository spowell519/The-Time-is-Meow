import React from 'react';
import { connect } from 'react-redux';

import { DefaultHeader } from './DefaultHeader';
import CrupdateProduct from './CrupdateProduct';
import ItemGrid from './ItemGrid';
import { getProducts } from '../redux/productsReducer';


class CategoryPage extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            mode: 'add',
            product: {},
        }
        this.editProduct = this.editProduct.bind(this);
        this.category = this.props.match.params.category;
    }

    editProduct(product, evt) {
        evt.preventDefault();
        this.setState((state) => ({ ...state, mode: 'edit', product }))
    }

    componentDidMount() {
        this.props.getProducts(this.category);
    }

    render() {
        const products = this.props.products || [];
        const { isAdmin } = this.props.auth;

        return (
            <div>
                {(isAdmin)
                    ? <CrupdateProduct mode={this.state.mode} product={this.state.product} />
                    : <DefaultHeader />
                }
                <ItemGrid products={products} editProduct={this.editProduct} category={this.category} />
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

export default connect(mapState, mapDispatch)(CategoryPage);
