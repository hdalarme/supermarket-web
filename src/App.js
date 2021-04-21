import React from "react";
import { Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import MenuTopo from "./components/topo.menu"

import Login from "./components/user/login";
import Register from "./components/user/register";

import Supermarkets from "./components/supermarket/supermarkets.component";
import AddSupermarket from "./components/supermarket/add-supermarket.component";
import Supermarket from "./components/supermarket/supermarket.component";

import Products from "./components/product/products.component";
import AddProduct from "./components/product/add-product.component";
import Product from "./components/product/product.component";

import List from "./components/list/lists.component";
import AddList from "./components/list/add-list.component";


function App() {

    return (
      <div>
        
        <MenuTopo />

        <div className="container mt-3">
          <Switch>

            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            
            <Route exact path="/supermarkets" component={Supermarkets} />
            <Route exact path="/supermarket-add" component={AddSupermarket} />
            <Route path="/supermarkets/:id" component={Supermarket} />

            <Route exact path="/products" component={Products} />
            <Route exact path="/product-add" component={AddProduct} />
            <Route path="/products/:id" component={Product} />

            <Route exact path={["/", "/lists"]} component={List} />
            <Route exact path="/list-add" component={AddList} />
            <Route //path="/tutorials/:id" component={Tutorial} 
            />
          </Switch>
        </div>
      </div>
    );
  
}

export default App;