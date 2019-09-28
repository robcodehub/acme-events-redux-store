import React from 'react';
import connect from './connect';

const Home = connect(({events})=>{
  return(
    <div> You've got {events.length} events</div>
  );
});

export default Home;
