// individual element in ItemGrid
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class ItemPreview extends React.PureComponent {
  constructor(props) {
    super(props);
    this.addToCart = this.addToCart.bind(this);
  }

  addToCart(evt) {
    evt.preventDefault();
    console.log('put it in cart!')
  }

  render() {
    const product = this.props.product || {};
    const edit = this.props.edit;
    const isAdmin = this.props.auth.isAdmin;

    const { addToCart } = this;
    return (
      <div className="item-preview">
        <div className="quick-add">
          <span className="price">${product.price}</span>
          {(isAdmin) ? <button onClick={(evt) => edit(product, evt)} type="submit">🖌</button> : ' ' }
          <a href="" onClick={addToCart}>+</a>
        </div>
        <div className="thumbnail"><img src={'/images/' + product.imageUrl} /></div>
        <div className="info"><Link to={`/product/${product.id}`}><h4>{product.title}</h4></Link></div>
      </div>
    )
  }
}

const mapState = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapState)(ItemPreview);
