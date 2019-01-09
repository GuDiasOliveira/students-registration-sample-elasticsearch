import React, { Component } from 'react';
import { createStore } from 'redux';


function counter(state = 0, action) {
  switch(action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    default:
      return state;
  }
}

let store = createStore(counter);


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      counter: this.props.counter || 0
    }
    store.subscribe(() => this.setState({counter: store.getState()}));
  }

  render() {
    return (
      <div>
        <button onClick={() => store.dispatch({type: 'INCREMENT'})}>+</button>
        <br />
        <h4>{this.state.counter}</h4>
        <br />
        <button onClick={() => store.dispatch({type: 'DECREMENT'})}>-</button>
      </div>
    );
  }
}

export default App;
