import {createStore, combineReducers}  from 'redux';
    const { HashRouter, Route, Link } = ReactRouterDOM;

      const reducer = combineReducers({
        events: (state = [], action) => {
          if(action.type === 'SET_EVENTS'){
            return action.events
          }
          else if(action.type === 'ADD_EVENT'){
            return [...state, action.event]
          }
           else if(action.type === 'DESTROY_EVENT'){
            return [...state].filter(event => event !== action.event);
          }
          return state;
      }
    });
    const store = createStore(reducer)

    const fetchEvents = async ()=> {
      const events = (await axios.get('/api/events')).data
      store.dispatch({type: 'SET_EVENTS', events: events});
    };

    const createEvent = async ()=> {
      const event = (await axios.post('/api/events')).data
      store.dispatch({type: 'ADD_EVENT', event: event});
    };

    const destroyEvent = async (event)=> {
      (await axios.delete(`/api/events/${event.id}`))
      store.dispatch({type: 'DESTROY_EVENT', event: event});
    };

    export default store
    export {fetchEvents, destroyEvent, createEvent};
