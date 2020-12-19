import React, { Component } from "react";
import { Link } from "react-router-dom";
import SupermarketDataService from "../../services/supermarket.service";


export default class Supermarket extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchName = this.onChangeSearchName.bind(this);
    this.retrieveSupermarkets = this.retrieveSupermarkets.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveSupermarket = this.setActiveSupermarket.bind(this);
    this.removeAllSupermarkets = this.removeAllSupermarkets.bind(this);
    this.searchName = this.searchName.bind(this);

    this.state = {
      supermarkets: [],
      currentSupermarket: null,
      currentIndex: -1,
      searchName: ""
    };
  }

  componentDidMount() {
    this.retrieveSupermarkets();
  }

  onChangeSearchName(e) {
    const searchName = e.target.value;

    this.setState({
      searchName: searchName
    });
  }

  retrieveSupermarkets() {
    SupermarketDataService.getAll()
      .then(response => {
        this.setState({
          supermarkets: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveSupermarkets();
    this.setState({
      currentSupermarket: null,
      currentIndex: -1
    });
  }

  setActiveSupermarket(supermarket, index) {
    this.setState({
      currentSupermarket: supermarket,
      currentIndex: index
    });
  }

  removeAllSupermarkets() {
    SupermarketDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchName() {
    SupermarketDataService.findByName(this.state.searchName)
      .then(response => {
        this.setState({
          supermarkets: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { searchName, supermarkets, currentSupermarket, currentIndex } = this.state;

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
          <h4>Supermarket List</h4>

          <ul className="list-group">
            {supermarkets &&
              supermarkets.map((supermarket, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveSupermarket(supermarket, index)}
                  key={index}
                >
                  {supermarket.name}
                </li>
              ))}
          </ul>

          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllSupermarketss}
          >
            Remove All
          </button>

          <Link
            to={"/supermarket-add/"} 
              className="m-3 btn btn-sm btn-success"
            >
            Adicionar
          </Link>
        </div>
        <div className="col-md-6">
          {currentSupermarket ? (
            <div>
              <h4>Supermarket</h4>
              <div>
                <label>
                  <strong>Name:</strong>
                </label>{" "}
                {currentSupermarket.name}
              </div>
              <div>
                <label>
                  <strong>Address:</strong>
                </label>{" "}
                {currentSupermarket.address}
              </div>
              <div>
                <label>
                  <strong>District:</strong>
                </label>{" "}
                {currentSupermarket.district}
              </div>
              <div>
                <label>
                  <strong>City:</strong>
                </label>{" "}
                {currentSupermarket.city}
              </div>
              <div>
                <label>
                  <strong>State:</strong>
                </label>{" "}
                {currentSupermarket.state}
              </div>
              <div>
                <label>
                  <strong>Status:</strong>
                </label>{" "}
                {currentSupermarket.published ? "Published" : "Pending"}
              </div>

              <Link
                to={"/supermarkets/" + currentSupermarket.id}
                className="m-3 btn btn-sm btn-warning" //badge badge-
              >
                Edit
              </Link>

              <Link
                to={"/supermarkets/" + currentSupermarket.id}
                className="m-3 btn btn-sm btn-danger" //badge badge-
              >
                Remover
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Supermarket...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}