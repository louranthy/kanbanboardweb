import './App.css';
import Login from './components/Login';
import { BrowserRouter, Route, Router, Switch } from 'react-router-dom';
import Home from './components/Home';
import Board from './components/Board';


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
      <Route exact path="/board">
      <Board />
      </Route>
    </Switch>
  </BrowserRouter>
  );
}

export default App;
