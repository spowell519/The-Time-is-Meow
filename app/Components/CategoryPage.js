import React from 'react';
import { connect } from 'react-redux';

import { DefaultHeader } from './DefaultHeader';
import ItemGrid from './ItemGrid';
import { getCategoryProducts } from '../redux/productsReducer';


class CategoryPage extends React.PureComponent {
    constructor(props) {
        super(props);
        this.category = this.props.match.params.id;
        console.log('cat', this.category);
    }


    componentDidMount() {
        this.props.getProducts(this.category);
    }

    render() {
        const products = this.props.products || [];
        console.log('products', products);
        return (
            <div>
                <DefaultHeader />
                <ItemGrid products={products} category={this.category} />
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
    return ({
        getProducts: (category) => dispatch(getCategoryProducts(category)),
    })
}

export default connect(mapState, mapDispatch)(CategoryPage);
