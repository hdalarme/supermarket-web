import React, { Component } from "react";
import ListDataService from "../../services/list.service";

export default class AddList extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
        this.saveList = this.saveList.bind(this);
    this.newList = this.newList.bind(this);

    this.state = {
      id: null,
      name: "",
      
      submitted: false
    };
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value
    });
  }

  saveList() {
    var data = {
      name: this.state.name,
    };

    ListDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          name: response.data.name,

          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newList() {
    this.setState({
      id: null,
      name: "",


      submitted: false
    });
  }

  render() {
    return (
        <div className="submit-form">
          {this.state.submitted ? (
            <div>
              <h4>You submitted successfully!</h4>
              <button className="btn btn-success" onClick={this.newList}>
                Add
              </button>
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
  
              <button onClick={this.saveList} className="btn btn-success">
                Submit
              </button>
            </div>
          )}
        </div>
      );
  }
}