// individual element in ItemGrid
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {addToCart} from '../../redux/cartReducer'

class ItemPreview extends React.PureComponent {
  constructor(props) {
    super(props);
    this.addToCartHandler = this.addToCartHandler.bind(this);
  }

  addToCartHandler(product, evt) {
    evt.preventDefault();
    this.props.addToCart(product)
  }

  render() {
    const product = this.props.product || {};
    const edit = this.props.edit;
    const isAdmin = this.props.auth.isAdmin;

    return (
      <div className="item-preview">
        <div className="quick-add">
          {(isAdmin) ? <button onClick={(evt) => edit(product, evt)} type="submit"><img src="/images/edit.png" /></button> : ' ' }
          <button onClick={() => this.props.addProductToCart(product)} type="button"><img src="/images/add-cart.png" /></button>
        </div>
        <div className="thumbnail"><img src={'/images/' + product.imageUrl} /></div>
        <div className="info"><Link to={`/product/${product.id}`}><h4>{product.title}</h4></Link>
          <span className="price">${product.price}</span>
        </div>
      </div>
    )
  }
}

const mapState = (state) => {
  return {
    auth: state.auth,
  };
};

const mapDispatch = (dispatch) => {
  return {
    addProductToCart: (product) => dispatch(addToCart(product))
  }
}

export default connect(mapState, mapDispatch)(ItemPreview);
