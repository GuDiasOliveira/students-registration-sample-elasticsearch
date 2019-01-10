import React, { Component } from 'react';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { reducer as formReducer } from 'redux-form';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import CourseForm from './forms/CourseForm';
import CourseView from './views/CoursesView';
import courses from './reducers/courses';


const reducer = combineReducers({
  courses,
  form: formReducer
});

const store = createStore(reducer);


class App extends Component {
  render() {
    return(
      <Provider store={store}>
        <MuiThemeProvider muiTheme={getMuiTheme()}>
          <div>
            <CourseForm />
            <CourseView />
          </div>
        </MuiThemeProvider>
      </Provider>
    );
  }
}


export default App;
