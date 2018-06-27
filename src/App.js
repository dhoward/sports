import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import './App.css';
import Index from "./pages/index";
import Event from "./pages/event";
import Sport from "./pages/sport";

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Index}/>
          <Route path="/events/:id" component={Event}/>
          <Route path="/sports/:id" component={Sport}/>
          <Redirect to={"/"}/>
        </Switch>
      </Router>
    );
  }
}

export default App;
