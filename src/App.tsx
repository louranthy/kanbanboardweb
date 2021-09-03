import React from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './components/Login';
import { BrowserRouter, Route, Router, Switch } from 'react-router-dom';
import Home from './components/Home';


function App() {
  return (
    <BrowserRouter>
      <Switch>
      <Route exact path="/">
      <Home />
      </Route>
      <Route  exact path="/login">
        <Login />
      </Route>
    </Switch>
  </BrowserRouter>
  );
}

export default App;
