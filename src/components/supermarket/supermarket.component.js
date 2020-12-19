import React, { Component } from "react";
import SupermarketDataService from "../../services/supermarket.service";

export default class Supermarket extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeAddress = this.onChangeAddress.bind(this);
    this.onChangeDistrict = this.onChangeDistrict.bind(this);
    this.onChangeCity = this.onChangeCity.bind(this);
    this.onChangeState = this.onChangeState.bind(this);
    this.getSupermarket = this.getSupermarket.bind(this);
    this.updatePublished = this.updatePublished.bind(this);
    this.updateSupermarket = this.updateSupermarket.bind(this);
    this.deleteSupermarket = this.deleteSupermarket.bind(this);

    this.state = {
      currentTutorial: {
        id: null,
        name: "",
        district: "", 
        city: "",
        state: "",
        published: false
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getSupermarket(this.props.match.params.id);
  }

  onChangeName(e) {
    const name = e.target.value;

    this.setState(function(prevState) {
      return {
        currentSupermarket: {
          ...prevState.currentSupermarket,
          name: name
        }
      };
    });
  }

  onChangeAddress(e) {
    const address = e.target.value;
    
    this.setState(prevState => ({
      currentSupermarket: {
        ...prevState.currentSupermarket,
        address: address
      }
    }));
  }

  onChangeDistrict(e) {
    const district = e.target.value;
    
    this.setState(prevState => ({
      currentSupermarket: {
        ...prevState.currentSupermarket,
        district: district
      }
    }));
  }

  onChangeCity(e) {
    const city = e.target.value;
    
    this.setState(prevState => ({
      currentSupermarket: {
        ...prevState.currentSupermarket,
        city: city
      }
    }));
  }

  onChangeState(e) {
    const state = e.target.value;
    
    this.setState(prevState => ({
      currentSupermarket: {
        ...prevState.currentSupermarket,
        state: state
      }
    }));
  }

  getSupermarket(id) {
    SupermarketDataService.get(id)
      .then(response => {
        this.setState({
          currentSupermarket: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updatePublished(status) {
    var data = {
      id: this.state.currentTutorial.id,
      title: this.state.currentTutorial.title,
      description: this.state.currentTutorial.description,
      published: status
    };

    SupermarketDataService.update(this.state.currentTutorial.id, data)
      .then(response => {
        this.setState(prevState => ({
          currentTutorial: {
            ...prevState.currentTutorial,
            published: status
          }
        }));
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateSupermarket() {
    SupermarketDataService.update(
      this.state.currentSupermarket.id,
      this.state.currentSupermarket
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The Supermarket was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteSupermarket() {    
    SupermarketDataService.delete(this.state.currentSupermarket.id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/supermarkets')
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentSupermarket } = this.state;

    return (
      <div>
        {currentSupermarket ? (
          <div className="edit-form">
            <h4>Supermarket</h4>
            <form>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  value={currentSupermarket.name}
                  onChange={this.onChangeName}
                />
              </div>

              <div className="form-group">
                <label htmlFor="address">Address</label>
                <input
                  type="text"
                  className="form-control"
                  id="address"
                  value={currentSupermarket.address}
                  onChange={this.onChangeAddress}
                />
              </div>

              <div className="form-group">
                <label htmlFor="district">District</label>
                <input
                  type="text"
                  className="form-control"
                  id="district"
                  value={currentSupermarket.district}
                  onChange={this.onChangeDistrict}
                />
              </div>

              <div className="form-group">
                <label htmlFor="city">City</label>
                <input
                  type="text"
                  className="form-control"
                  id="city"
                  value={currentSupermarket.city}
                  onChange={this.onChangeCity}
                />
              </div>

              <div className="form-group">
                <label htmlFor="state">State</label>
                <input
                  type="text"
                  className="form-control"
                  id="state"
                  value={currentSupermarket.state}
                  onChange={this.onChangeState}
                />
              </div>


              <div className="form-group">
                <label>
                  <strong>Status:</strong>
                </label>
                {currentSupermarket.published ? "Published" : "Pending"}
              </div>
            </form>

            {currentSupermarket.published ? (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updatePublished(false)}
              >
                UnPublish
              </button>
            ) : (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updatePublished(true)}
              >
                Publish
              </button>
            )}

            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteSupermarket}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateSupermarket}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Tutorial...</p>
          </div>
        )}
      </div>
    );
  }
}