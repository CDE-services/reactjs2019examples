import React, { Component } from 'react';
import './App.css';
import Minesweeper from './minesweeper/Minesweeper';
import Characters from './components/Characters';
import RoutingExample from './components/RoutingExample';
import RandomNumber from './setStateExamples/setStateHierarchy/RandomNumber';
import SimpleForms from './setStateExamples/correctSetState/SimpleForms';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import CharactersWithRest from './rest/CharactersWithRest';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <nav>
            <ul>
              <li><Link to='/characters'>Characters example</Link></li>
              <li><Link to='/characters-with-rest'>Characters with REST</Link></li>
              <li><Link to='/component-hierarchy'>Component hierarchy example</Link></li>
              <li><Link to='/simple-forms'>Simple forms example</Link></li>
              <li><Link to='/minesweeper'>Minesweeper</Link></li>
              <li><Link to='/routing'>Routing example</Link></li>
            </ul>
          </nav>

          <Switch>
            <Route path='/characters'>
              <Characters />
            </Route>
            <Route path='/characters-with-rest'>
              <CharactersWithRest />
            </Route>
            <Route path='/component-hierarchy'>
              <RandomNumber />
            </Route>
            <Route path='/simple-forms'>
              <SimpleForms />
            </Route>
            <Route path='/minesweeper'>
              <Minesweeper />
            </Route>
            <Route path='/routing'>
              <RoutingExample />
            </Route>
            <Route path='/'>
              <RandomNumber />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
