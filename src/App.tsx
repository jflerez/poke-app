import React from "react";
import "./App.css";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Home from "./components/Home";
import PrivateRoute from "./auth/PrivateRoute";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Favorites from "./components/Favorites";
import Users from "./components/Users";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/" component={Login} />
        <Route exact path="/register" component={SignUp} />
        <Route exact path="/favorites" component={Favorites} />
        <Route exact path="/users" component={Users} />
        <PrivateRoute exact path="/home" component={Home} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
