// if user is logged in as admin, show this component
// if in a grid view, uses productS reducer, single page uses product reducer

import React from 'react';
import { connect } from 'react-redux';

import { getProducts, addProductToList, editProductInList } from '../redux/productsReducer';
import { getProduct, editProduct } from '../redux/productReducer';
const emptyState = {
  title: '', category: '', price: '', imageUrl: '',
  description: '', rating: '', inventory: '',
}

class CrupdateProduct extends React.Component {
  constructor(props) {
    super(props);

    this.state = emptyState;
    this.source = window.location.pathname.includes('/product/') ? 'single' : 'list';

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.resetForm = this.resetForm.bind(this);

  }

  // eslint-disable-next-line complexity
  componentDidUpdate() {
    if (this.props.mode === 'edit' && this.state.id !== this.props.product.id) {
      const product = this.props.product;
      this.setState({
          title: product.title || '',
          category: product.category || '',
          price: product.price || '',
          imageUrl: product.imageUrl || '',
          description: product.description || '',
          rating: product.rating || '',
          inventory: product.inventory || '',
          id: product.id,
        });
    }
  }

  handleChange(evt) {
    const { name, value } = evt.target;
    this.setState((state) => ({...state, [name]: value}))
  }

  handleSubmit(evt) {
    evt.preventDefault();
    // add or edit
    (this.props.mode === 'add')
    ? this.props.addProduct({ ...this.state})
    : this.props.editProduct({...this.state});

    // refresh form and state
    (this.props.mode === 'add')
    ? this.resetForm()
    : (this.source === 'list')
        ? this.props.getProducts()
        : this.props.getProduct(this.state.product.id);
  }

  resetForm() {
    this.setState(emptyState);
  }

  render() {
    const { handleSubmit, handleChange } = this;
    const { title, category, price, imageUrl, description, rating, inventory } = this.state;

    return (
      <section>
        <div className="highlighted">
          <div>
            <h3>{(this.props.mode === 'add') ? "Add" : "Edit" } Product</h3>
          </div>
          <div>
            <form id="product_crupdate" onSubmit={handleSubmit}>
              <div className="wide">
                <label htmlFor="title">Product Name</label>
                <input name="title" value={title} onChange={handleChange} />
              </div>

              <div>
                <label htmlFor="category">Category</label>
                <select name="category" value={category} onChange={handleChange}>
                  <option value="treat">Treats</option>
                  <option value="toy">Toys</option>
                  <option value="clothing">Clothing</option>
                </select>
              </div>

              <div>
                <label htmlFor="inventory">Inventory Quantity</label>
                <input name="inventory" value={inventory} onChange={handleChange} />
              </div>

              <div>
                <label htmlFor="price">Price</label>
                <input name="price" value={price} onChange={handleChange} />
              </div>

              <div>
                <label htmlFor="rating">Rating</label>
                <input name="rating" value={rating} onChange={handleChange} />
              </div>

              <div className="wide">
                <label htmlFor="imageUrl">Product Photo URL</label>
                <input name="imageUrl" value={imageUrl} onChange={handleChange} />
              </div>

              <div className="wide">
                <label htmlFor="description">Description</label>
                <textarea name="description" value={description} onChange={handleChange} />
              </div>

              <div>
                <button type="submit">Submit</button>
              </div>

            </form>
          </div>
        </div>
      </section>
    )
  }
}

const mapStateForList = (state) => {
  return {
    products: state.products,
  };
};

const mapStateForSingle = (state) => {
  return {
    product: state.product,
  };
};

const mapDispatchForList = (dispatch) => ({
  getProducts: () => dispatch(getProducts()),
  addProduct: (product) => dispatch(addProductToList(product)),
  editProduct: (product) => dispatch(editProductInList(product)),
});

const mapDispatchForSingle = (dispatch) => ({
  getProduct: (id) => dispatch(getProduct(id)),
  editProduct: (product) => dispatch(editProduct(product)),
});

export default (window.location.pathname.includes('/product/') )
  ? connect(mapStateForSingle, mapDispatchForSingle)(CrupdateProduct)
  : connect(mapStateForList, mapDispatchForList)(CrupdateProduct)
