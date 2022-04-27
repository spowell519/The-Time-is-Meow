/* eslint-disable no-unused-expressions */
import { expect } from "chai";
import { mount } from "enzyme";
import sinon from "sinon";
import React from "react";
import configureMockStore from "redux-mock-store";
import thunkMiddleware from "redux-thunk";
import waitForExpect from "wait-for-expect";
import { Provider } from "react-redux";
import * as rrd from "react-router-dom";

const { MemoryRouter } = rrd;

const middlewares = [thunkMiddleware];
const mockStore = configureMockStore(middlewares);

import mockAxios from "../mock-axios";

import store from "../../app/store";

import rootReducer from "../../app/redux";
import { createStore } from "redux";

const app = require("../../server");
const agent = require("supertest")(app);

const seed = require('../seed')

// const initialState = []

import ProductsPage from "../app/Components/Product/ProductsPage";
import Navbar from "../app/Components/Navbar";
import Routes from "../app/Components/Routes";
import SingleProduct from "../app/Components/Product/SingleProduct";
import { Product } from "../server/db";

describe("ProductsPage component", () =>{
  const products = [{
    title: "edible mouse",
    category: ["treat", "toy"],
    price: 195,
    imageUrl: "default.png",
    description: "is it for eating or playing? your cat will decide",
    rating: 4.8,
    inventory: 32
  },
  {
    title: "Cat-ctus",
    category: ["tree", "toy"],
    price: 10195,
    imageUrl: "default.png",
    description: "A cactus cat tree with cute flowers to play with",
    rating: 4.8,
    inventory: 32
  }
]
  beforeEach(() => {
    mockAxios.onGet('/api/products').replyOnce(200, products);
  });
  describe("<ProductsPage /> component", () => {
    const getProductsSpy = sinon.spy();
    afterEach(()=> {
      getProductsSpy.resetHistory()
    })

    it("renders the products passed in", ()=> {
      const wrapper = mount(
        <MemoryRouter>
          <ProductsPage products={products} getProducts={getProductsSpy}/>
        </MemoryRouter>
      )
      expect(wrapper.text()).to.include("Cat-ctus")
    });

    it("calls this.props.getProducts after mount", async () => {
      mount(
        <MemoryRouter>
          <ProductsPage products={products} getProducts={getProductsSpy}/>
        </MemoryRouter>
      );
      await waitForExpect(() => {
        expect(getCampusesSpy).to.have.been.called;
      });
    });

  })

  describe("express API", ()=> {
    const {findAll: product} = SingleProduct
    beforeEach(()=> {
      SingleProduct.findAll = sinon.spy(() => singleProduct);
    })
    afterEach(()=> {
      SingleProduct.findAll = product.findAll
    })

    it("GET /api/products/${id} responds with the correct product", async() => {
      const response = await agent.get("/api/products/1").expect(200);
      expect(response.body).to.deep.equal([
        {
          title: "edible mouse",
          category: ["treat", "toy"],
          price: 195,
          imageUrl: "default.png",
          description: "is it for eating or playing? your cat will decide",
          rating: 4.8,
          inventory: 32
        }
      ])

    })
  })

  describe("Seed file", () => {
    beforeEach(seed);

    it("has fields title, price, imageUrl", async () => {
      const product = await Product.create({
        title: "dental chew",
        category: ["treat"],
        price: 2499,
        imageUrl: "default.png",
        description: "it's this or brushing their teeth",
        rating: 4.8,
        inventory: 42
      });
      expect(product.title).to.equal("dental chew");
      expect(product.price).to.equal(2499);
      expect(product.imageUrl).to.equal("default.png");

    });

    it("default imageUrl if left blank", async () => {
      const product = Product.build({
        title: "dental chew",
        category: ["treat"],
        price: 2499,
        description: "it's this or brushing their teeth",
        rating: 4.8,
        inventory: 42
      });
      await product.validate();
      expect(product.imageUrl).to.be.a("string");
      expect(product.imageUrl.length).to.be.greaterThan(1);
    });

    it("populates the database with at least four products", async () => {
      const seededProducts = await Product.findAll();
      expect(seededProducts).to.have.lengthOf.at.least(4);
    });
  });

})
