import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';

import AddPosition from './components/add-position.component';
import Position from './components/position.component';
import PositionList from './components/position-list.component';


function App() {
  return (
    <Router>
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a className="navbar-brand" href="#">Hot and Spicy Meat Hot Dogs</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item active">
                <Link to={'/positions'} className="nav-link">
                  Hot Dogs
                </Link>
              </li>
              <li className="nav-item active">
                <Link to={'/add'} className="nav-link">
                  Add Position
                </Link>
              </li>
            </ul>
          </div>
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/positions"]} component={PositionList} />
            <Route exact path="/add" component={AddPosition} />
            <Route path="/positions/:id" component={Position} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
