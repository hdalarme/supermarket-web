import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import List from "./components/list/lists.component";
import AddList from "./components/list/add-list.component";

import TutorialsList from "./components/tutorials-list.component";

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <a href="/lists" className="navbar-brand">
            Supermarket
          </a>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/supermarket"} className="nav-link">
                Stores
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/products"} className="nav-link">
                Products
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/lists"]} component={List} 
            />
            <Route exact path="/listadd" component={AddList} 
            />
            <Route //path="/tutorials/:id" component={Tutorial} 
            />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;