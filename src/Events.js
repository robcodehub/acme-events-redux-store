import React from 'react';
import connect from './connect';
import { createEvent, destroyEvent } from './store';

const Events = connect(({events})=> {
  return(
    <div>
      <button onClick={()=>createEvent()}> Create Event </button>
    <ul>
      {
        events.map(event=> <li onClick={()=>destroyEvent(event)}key={ event.id }>{ event.name }</li>)
      }
    </ul>
    </div>
  );
});

export default Events;
