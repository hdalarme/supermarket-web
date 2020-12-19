import React, { Component } from "react";
import { Link } from "react-router-dom";
import ProductDataService from "../../services/product.service";

export default class AddProduct extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeUM = this.onChangeUM.bind(this);
    this.saveProduct = this.saveProduct.bind(this);
    this.newProduct = this.newProduct.bind(this);

    this.state = {
      id: null,
      name: "",
      unidadeMedida: "",
      published: false,

      submitted: false
    };
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value
    });
  }

  onChangeUM(e) {
    this.setState({
      unidadeMedida: e.target.value
    });
  }

  saveProduct() {
    var data = {
      name: this.state.name,
      unidadeMedida: this.state.unidadeMedida,
      
    };

    ProductDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          name: response.data.name,
          unidadeMedida: response.data.unidadeMedida,

          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newProduct() {
    this.setState({
      id: null,
      name: "",
      unidadeMedida: "",

      submitted: false
    });
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newProduct}>
              Add
            </button>
            <Link
              to={"/products/"}
              className="m-3 btn btn btn-warning" //badge badge-
            >
              Voltar
            </Link>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                required
                value={this.state.name}
                onChange={this.onChangeName}
                name="name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="unidadeMedida">Unidade</label>
              <input
                type="text"
                className="form-control"
                id="unidadeMedida"
                required
                value={this.state.unidadeMedida}
                onChange={this.onChangeUM}
                name="unidadeMedida"
              />
            </div>

            <button onClick={this.saveProduct} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }
}