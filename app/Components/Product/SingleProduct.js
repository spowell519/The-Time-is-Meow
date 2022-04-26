import React from 'react';
import { connect } from 'react-redux'
import { addProductToCart } from '../../redux/productReducer';

const SingleProduct = (props) => {
  const product = props.product || {};
  const tags = props.product.category || []
  const addProductToCart = props.addProductToCart
  console.log(props)

  return (
    <section>
      <div className="highlighted">
        <div className="left">
          <img src={`/images/${product.imageUrl}`} alt={`image of ${product.title}`} />
        </div>
        <div className="info">
          <div className="wide">
            <h2>{product.title}</h2>
          </div>
          <div>
            <p className="label">RATING</p>
            <p><span className="bubble">{"😻😻😻😻😻".slice(0, 2 * Math.round(product.rating))}</span></p>
          </div>
          <div>
            <p className="label">PRICE</p>
            <p><span className="bubble">${product.price}</span></p>
          </div>
          <div>
            <p className="label">AVAILABLE</p>
            <p><span className="bubble">{(product.inventory > 0) ? "Yes!" : "No"}</span></p>
          </div>
          <div className="wide">
            <p className="label">ABOUT</p>
            <p className="bubble">{product.description} </p>
            tags: <ul>{tags.map(tag => <li key={tag}>{tag}</li>)}</ul>
          </div>
          <button type="button" className="blue" onClick={()=> addProductToCart(product)}>add to cart</button>
        </div>
      </div>
    </section>
  )
}

const mapDispatch = dispatch => {
  return {
    addProductToCart: (product) => dispatch(addProductToCart(product))
  }
}

export default connect(null, mapDispatch)(SingleProduct);
