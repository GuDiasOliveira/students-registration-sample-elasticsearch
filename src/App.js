import React, { Component } from 'react';
import { createStore, combineReducers } from 'redux';
import { Provider, connect } from 'react-redux';
import { reducer as formReducer, initialize } from 'redux-form';

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


function mapDispatchToProps(dispatch) {
  return({
    populateCourseForm: course => {
      dispatch(initialize('course', course));
    },
    clearCourseFormFields: () => {
      dispatch(initialize('course', {}));
    }
  });
}

class RootView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      editCourseId: 0
    }
  }

  render() {
    const { populateCourseForm, clearCourseFormFields } = this.props;
    return(
      <div>
        <h1>{this.state.editCourseId ? `Edit course #${this.state.editCourseId}` : 'Create new course'}</h1>
        {this.state.editCourseId ? (
          <button onClick={() => {
            this.setState({editCourseId: 0});
            clearCourseFormFields();
          }}>Create mode</button>
        ) : ''}
        <CourseForm
          editCourseId={this.state.editCourseId}
          setToCreateMode={() => this.setState({ editCourseId: 0 })}
        />
        <h1>Courses list</h1>
        <CourseView onEditCourse={course => {
          populateCourseForm(course);
          this.setState({editCourseId: course._id});
        }} />
      </div>
    );
  }
}

RootView = connect(
  undefined,
  mapDispatchToProps
)(RootView);

class App extends Component {
  render() {
    return(
      <Provider store={store}>
        <MuiThemeProvider muiTheme={getMuiTheme()}>
          <RootView />
        </MuiThemeProvider>
      </Provider>
    );
  }
}


export default App;
