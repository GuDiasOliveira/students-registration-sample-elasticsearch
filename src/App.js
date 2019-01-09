import React, { Component } from 'react';
import { createStore, combineReducers } from 'redux';


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

function text(state = '', action) {
  switch(action.type) {
    case 'UPDATE_TEXT':
      return action.text;
    default:
      return state;
  }
}

let reducer = combineReducers({
  counter,
  text
});

let store = createStore(reducer);


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      counter: this.props.counter || 0
    }
    store.subscribe(() => {
      let state = store.getState();
      this.setState({
        counter: state.counter,
        text: state.text
      })
    });
  }

  render() {
    return (
      <div>
        <button onClick={() => store.dispatch({type: 'INCREMENT'})}>+</button>
        <h4 style={{display: 'inline'}}>{this.state.counter}</h4>
        <button onClick={() => store.dispatch({type: 'DECREMENT'})}>-</button>
        <hr />
        What is your name? <input type="text" onChange={(event) => store.dispatch({type: 'UPDATE_TEXT', text: event.target.value})} />
        <h5>Your name is {this.state.text}</h5>
      </div>
    );
  }
}

export default App;
