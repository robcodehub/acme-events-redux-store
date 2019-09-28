import store from './store';

const connect = (Component)=> {
  class Connected extends React.Component{
    constructor(){
      super();
      this.state = store.getState();
    }
    componentWillUnmount(){
      this.unsubscribe();
    }
    componentDidMount(){
      this.unsubscribe = store.subscribe(() => this.setState(store.getState()));
    }
    render(){
      return (
        <Component {...this.state } {...this.props }/>
      );
    }
  }
  return Connected;
}

export default connect;
