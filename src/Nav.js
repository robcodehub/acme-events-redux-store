import React from 'react';
import { HashRouter, Route, Link } from 'react-router-dom';
import connect from './connect';

const Nav = ({events})=>{
  return(
    <nav>
      <Link to='/'>Home</Link>
      <Link to='/events'>Events ({events.length})</Link>
    </nav>
  );
};

export default connect(Nav);
