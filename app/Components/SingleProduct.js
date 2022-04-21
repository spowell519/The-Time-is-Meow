import React from 'react';
import { connect } from 'react-redux';

const SingleProduct = (props) => {
  const product = props.product || {};

  return (
    <section>
      <div className="highlighted">
        <div>
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
            <p className="bubble">{product.description}</p>
          </div>
          <button type="button">add to cart</button>
        </div>
      </div>
    </section>
  )
}

export default SingleProduct;
