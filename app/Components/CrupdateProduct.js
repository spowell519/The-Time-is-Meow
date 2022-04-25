// if user is logged in as admin, show this component
// if in a grid view, uses productS reducer, single page uses product reducer

import React from 'react';
import { connect } from 'react-redux';
import Accordion from 'react-bootstrap/Accordion';
import { useAccordionButton } from 'react-bootstrap/AccordionButton';
import Card from "react-bootstrap/Card";
import CreatableSelect from 'react-select/creatable';

import { getProducts, addProductToList, editProductInList } from '../redux/productsReducer';
import { getProduct, editProduct } from '../redux/productReducer';
const emptyState = {
  title: '', category: [], price: '', imageUrl: '',
  description: '', inventory: '',
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
    const product = { ...this.state};
    const user = this.props.auth;
    (this.props.mode === 'add')
    ? this.props.addProduct(product, user)
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
    const { title, category, price, imageUrl, description, inventory } = this.state;
    const catOptions = [
      {value: "treat", label: "Treat", color: "#00B8D9", isFixed: false},
      {value: "toy", label: "Toy", color: "#00B8D9", isFixed: false},
      {value: "clothing", label: "Clothing", color: "#00B8D9", isFixed: false},
    ]

    return (
      <section>
        <div className="highlighted">
          <div className="left">
            <h3>ADMIN</h3>
          </div>
          <div>
          <Accordion flush>
            <Card>
              <Card.Header>
                <CustomToggle eventKey="0">{(this.props.mode === 'add') ? "Add" : "Edit" } Product</CustomToggle>
              </Card.Header>
              <Accordion.Collapse eventKey="0">
                <Card.Body>
                <form id="product_crupdate" onSubmit={handleSubmit}>
                  <div className="wide">
                    <label htmlFor="title">Product Name</label>
                    <input name="title" value={title} onChange={handleChange} />
                  </div>

                  <div className="wide">
                    <label htmlFor="category">Category</label>
                    <CreatableSelect isMulti onChange={this.handleChange} options={catOptions} />
                    {/* <select name="category" value={category} onChange={handleChange}>
                      <option value="treat">Treats</option>
                      <option value="toy">Toys</option>
                      <option value="clothing">Clothing</option>
                    </select> */}
                  </div>

                  <div>
                    <label htmlFor="inventory">Inventory Quantity</label>
                    <input name="inventory" value={inventory} onChange={handleChange} />
                  </div>

                  <div>
                    <label htmlFor="price">Price</label>
                    <input name="price" value={price} onChange={handleChange} />
                  </div>

                  <div className="wide">
                    <label htmlFor="imageUrl">Product Photo URL</label>
                    <input name="imageUrl" value={imageUrl} onChange={handleChange} />
                  </div>

                  <div className="wide">
                    <label htmlFor="description">Description</label>
                    <textarea name="description" value={description} onChange={handleChange} />
                  </div>

                  <div><button type="submit">Submit</button></div>

                </form>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
          </div>
        </div>
      </section>
    )
  }
}

const mapStateForList = (state) => {
  return {
    products: state.products,
    auth: state.auth,
  };
};

const mapStateForSingle = (state) => {
  return {
    product: state.product,
    auth: state.auth,
  };
};

const mapDispatchForList = (dispatch) => ({
  getProducts: () => dispatch(getProducts()),
  addProduct: (product, user) => dispatch(addProductToList(product, user)),
  editProduct: (product) => dispatch(editProductInList(product)),
});

const mapDispatchForSingle = (dispatch) => ({
  getProduct: (id) => dispatch(getProduct(id)),
  editProduct: (product) => dispatch(editProduct(product)),
});

export default (window.location.pathname.includes('/product/') )
  ? connect(mapStateForSingle, mapDispatchForSingle)(CrupdateProduct)
  : connect(mapStateForList, mapDispatchForList)(CrupdateProduct)


  function CustomToggle({ children, eventKey }) {
    const decoratedOnClick = useAccordionButton(eventKey, () =>
      console.log("toggle clicked"));
    return (
      <button type="button" onClick={decoratedOnClick}>
        {children}
      </button>
    );
  }
