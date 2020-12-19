import React, { Component } from "react";
import ListDataService from "../../services/list.service";
import { Link } from "react-router-dom";

import AddList from "./add-list.component";

export default class List extends Component {

    constructor(props) {
        super(props);
        this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
        this.retrieveLists = this.retrieveLists.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.setActiveList = this.setActiveList.bind(this);
        this.removeAllLists = this.removeAllLists.bind(this);
        this.searchName = this.searchName.bind(this);
    
        this.state = {
          tutorials: [],
          currentList: null,
          currentIndex: -1,
          searchTitle: ""
        };
      }

      componentDidMount() {
        this.retrieveLists();
      }

      onChangeSearchTitle(e) {
        const searchTitle = e.target.value;
    
        this.setState({
          searchTitle: searchTitle
        });
      }

      retrieveLists() {
        ListDataService.getAll()
          .then(response => {
            this.setState({
              lists: response.data
            });
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
      }

      refreshList() {
        this.retrieveLists();
        this.setState({
          currentList: null,
          currentIndex: -1
        });
      }

      setActiveList(list, index) {
        this.setState({
          currentList: list,
          currentIndex: index
        });
      }

      removeAllLists() {
        ListDataService.deleteAll()
          .then(response => {
            console.log(response.data);
            this.refreshList();
          })
          .catch(e => {
            console.log(e);
          });
      }

      searchName() {
        ListDataService.findByName(this.state.searchName)
          .then(response => {
            this.setState({
              lists: response.data
            });
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
      }

      render() {
        const { searchName, lists, currentList, currentIndex } = this.state;

        return (
            <div className="list row">
              <div className="col-md-8">
                <div className="input-group mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search by Name"
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
              <div className="col-md-12">
                <br />
                <AddList />
                <br />
                </div>
              <div className="col-md-6">
                <h4>Listas</h4>
      
                <ul className="list-group">
                  {lists &&
                    lists.map((list, index) => (
                      <li
                        className={
                          "list-group-item " +
                          (index === currentIndex ? "active" : "")
                        }
                        onClick={() => this.setActiveList(list, index)}
                        key={index}
                      >
                        {list.name}
                      </li>
                    ))}
                </ul>
      
                <button
                  className="m-3 btn btn-sm btn-danger"
                  onClick={this.removeAllLists}
                >
                  Remove All
                </button>

              </div>
              <div className="col-md-6">
                {currentList ? (
                  <div>
                    <h4>Listas</h4>
                    <div>
                      <label>
                        <strong>Title:</strong>
                      </label>{" "}
                      {currentList.name}
                    </div>
                    <div>
                      <label>
                        <strong>Description:</strong>
                      </label>{" "}
                      {currentList.description}
                    </div>
                    <div>
                      <label>
                        <strong>Status:</strong>
                      </label>{" "}
                      {currentList.published ? "Published" : "Pending"}
                    </div>
      
                    <Link
                      to={"/lists/" + currentList.id}
                      className="badge badge-warning"
                    >
                      Edit
                    </Link>
                  </div>
                ) : (
                  <div>
                    <br />
                    <p>Please click on a List...</p>
                  </div>
                )}
              </div>
            </div>
          );
      }

}