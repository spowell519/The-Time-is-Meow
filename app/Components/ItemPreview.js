// individual element in ItemGrid

import React from 'react';
import { connect } from 'react-redux';

class ItemPreview extends React.PureComponent {
  constructor(props) {
    super(props);
    this.addToCart = this.addToCart.bind(this);
  }
  addToCart() {
    console.log('put it in cart!')
  }
  render() {
    const product = this.props.product || {};
    return (
      <div className="item-preview">
        <div className="quick-add"><span className="price">${product.price}</span><a href="" onClick={this.addToCart}>+</a></div>
        <div className="thumbnail"><img src={'images/' + product.imageURL} /></div>
        <div className="info"><h4>{product.title}</h4></div>
      </div>
    )
  }
}

export default ItemPreview;
