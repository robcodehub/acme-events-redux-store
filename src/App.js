import React from 'react';
import { HashRouter, Route, Link } from 'react-router-dom';
import Nav from './Nav';
import Home from './Home';
import Events from './Events';
import { fetchEvents } from './store';

class App extends React.Component {
  componentDidMount() {
    fetchEvents();
  }
  render() {
    return (
      <HashRouter>
        <h1> Acme Event Planner With Redux</h1>
        <Route component={ Nav } />
        <Route path='/' component = { Home } exact />
        <Route path = '/events' component= { Events } />
      </HashRouter>
    )
  }
}

export default App;
