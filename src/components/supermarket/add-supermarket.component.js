import React, { Component } from "react";
import { Link } from "react-router-dom";
import SupermarketDataService from "../../services/supermarket.service";

export default class AddSupermarket extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeAddress = this.onChangeAddress.bind(this);
    this.onChangeDistrict = this.onChangeDistrict.bind(this);
    this.onChangeCity = this.onChangeCity.bind(this);
    this.onChangeState = this.onChangeState.bind(this);
    this.saveSupermarket = this.saveSupermarket.bind(this);
    this.newSupermarket = this.newSupermarket.bind(this);

    this.state = {
      id: null,
      name: "",
      address: "",
      district: "", 
      city: "",
      state: "",
      published: false,

      submitted: false
    };
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value
    });
  }

  onChangeAddress(e) {
    this.setState({
      address: e.target.value
    });
  }

  onChangeDistrict(e) {
    this.setState({
      district: e.target.value
    });
  }

  onChangeCity(e) {
    this.setState({
      city: e.target.value
    });
  }

  onChangeState(e) {
    this.setState({
      state: e.target.value
    });
  }

  saveSupermarket() {
    var data = {
      name: this.state.name,
      district: this.state.district,
      city: this.state.city,
      state: this.state.state
      
    };

    SupermarketDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          name: response.data.name,
          address: response.data.address,
          district: response.data.district,
          city: response.data.city,
          state: response.data.state,
          published: response.data.published,

          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newSupermarket() {
    this.setState({
      id: null,
      name: "",
      address: "",
      district: "",
      city: "",
      state: "",
      published: false,

      submitted: false
    });
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newSupermarket}>
              Add
            </button>
            <Link
              to={"/supermarkets/"}
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
              <label htmlFor="address">Address</label>
              <input
                type="text"
                className="form-control"
                id="address"
                required
                value={this.state.address}
                onChange={this.onChangeAddress}
                name="address"
              />
            </div>

            <div className="form-group">
              <label htmlFor="district">District</label>
              <input
                type="text"
                className="form-control"
                id="district"
                required
                value={this.state.district}
                onChange={this.onChangeDistrict}
                name="district"
              />
            </div>

            <div className="form-group">
              <label htmlFor="city">City</label>
              <input
                type="text"
                className="form-control"
                id="city"
                required
                value={this.state.city}
                onChange={this.onChangeCity}
                name="city"
              />
            </div>

            <div className="form-group">
              <label htmlFor="state">State</label>
              <input
                type="text"
                className="form-control"
                id="state"
                required
                value={this.state.state}
                onChange={this.onChangeState}
                name="state"
              />
            </div>

            <button onClick={this.saveSupermarket} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }
}