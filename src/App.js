import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Supermarkets from "./components/supermarket/supermarkets.component";
import AddSupermarket from "./components/supermarket/add-supermarket.component";
import Supermarket from "./components/supermarket/supermarket.component";
import List from "./components/list/lists.component";
import AddList from "./components/list/add-list.component";

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
              <Link to={"/supermarkets"} className="nav-link">
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
            <Route exact path={["/", "/supermarkets"]} component={Supermarkets} />
            <Route exact path="/supermarket-add" component={AddSupermarket} />
            <Route path="/supermarkets/:id" component={Supermarket} />

            <Route exact path={["/", "/lists"]} component={List} />
            <Route exact path="/listadd" component={AddList} />
            <Route //path="/tutorials/:id" component={Tutorial} 
            />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;