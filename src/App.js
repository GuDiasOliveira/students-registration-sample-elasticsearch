import React, { Component } from 'react';
import { createStore, combineReducers } from 'redux';
import { connect, Provider } from 'react-redux';


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


const mapStateToProps = state => {
  return {
    counter: state.counter,
    text: state.text
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onClickIncrement: event => {
      dispatch({type: 'INCREMENT'});
    },
    onClickDecrement: event => {
      dispatch({type: 'DECREMENT'});
    },
    onTextChange: event => {
      dispatch({type: 'UPDATE_TEXT', text: event.target.value});
    }
  }
}


class RootView extends Component {

  render() {
    return (
      <div>
        <button onClick={this.props.onClickIncrement}>+</button>
        <h4 style={{display: 'inline'}}>{this.props.counter}</h4>
        <button onClick={this.props.onClickDecrement}>-</button>
        <hr />
        What is your name? <input type="text" onChange={this.props.onTextChange} />
        <h5>Your name is {this.props.text}</h5>
      </div>
    );
  }
}

RootView = connect(
  mapStateToProps,
  mapDispatchToProps
)(RootView);


class App extends Component {
  render() {
    return(
      <Provider store={store}>
        <RootView />
      </Provider>
    );
  }
}


export default App;
