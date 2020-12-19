import React, { Component } from "react";
import { Link } from "react-router-dom";
import ProductDataService from "../../services/product.service";


export default class Products extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchName = this.onChangeSearchName.bind(this);
    this.retrieveProducts = this.retrieveProducts.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveProduct = this.setActiveProduct.bind(this);
    this.searchName = this.searchName.bind(this);

    this.state = {
      supermarkets: [],
      currentProduct: null,
      currentIndex: -1,
      searchName: ""
    };
  }

  componentDidMount() {
    this.retrieveProducts();
  }

  onChangeSearchName(e) {
    const searchName = e.target.value;

    this.setState({
      searchName: searchName
    });
  }

  retrieveProducts() {
    ProductDataService.getAll()
      .then(response => {
        this.setState({
          products: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveProducts();
    this.setState({
      currentProduct: null,
      currentIndex: -1
    });
  }

  setActiveProduct(product, index) {
    this.setState({
      currentProduct: product,
      currentIndex: index
    });
  }

  searchName() {
    ProductDataService.findByName(this.state.searchName)
      .then(response => {
        this.setState({
          products: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { searchName, products, currentProduct, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by name"
              value={searchName}
              onChange={this.onChangeSearchName}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchName}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>Products List</h4>

          <ul className="list-group">
            {products &&
              products.map((product, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveProduct(product, index)}
                  key={index}
                >
                  {product.name}
                </li>
              ))}
          </ul>

          <Link
            to={"/product-add/"} 
              className="m-3 btn btn-sm btn-success"
            >
            Adicionar
          </Link>
        </div>
        <div className="col-md-6">
          {currentProduct ? (
            <div>
              <h4>product</h4>
              <div>
                <label>
                  <strong>Name:</strong>
                </label>{" "}
                {currentProduct.name}
              </div>
              <div>
                <label>
                  <strong>UnidadeMedida:</strong>
                </label>{" "}
                {currentProduct.unidadeMedida}
              </div>
      
   
        

              <Link
                to={"/products/" + currentProduct.id}
                className="m-3 btn btn-sm btn-warning" //badge badge-
              >
                Edit
              </Link>

            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Product...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}