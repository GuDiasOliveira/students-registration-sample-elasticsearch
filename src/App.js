import React, { Component } from 'react';
import { createStore, combineReducers } from 'redux';
import { Provider, connect } from 'react-redux';
import { reducer as formReducer, initialize } from 'redux-form';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import CourseForm from './forms/CourseForm';
import CourseView from './views/CoursesView';
import courses from './reducers/courses';

import axios from 'axios';


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
    },
    refreshCoursesList: () => {
      axios.get('http://localhost:9200/_search?index=course')
        .then(response => (response.data.hits.hits.map(hit => ({_id: hit._id, ...hit._source}))))
        .then(courses => dispatch({ type: 'COURSE_LIST', courses }))
        .catch(err => {
          console.error('Failed to retrieve courses');
          console.error(err);
        });
    }
  });
}

class RootView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      editCourseId: 0
    }
    this.props.refreshCoursesList();
  }

  render() {
    const { populateCourseForm, clearCourseFormFields, refreshCoursesList } = this.props;
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
          onRefreshCoursesList={refreshCoursesList}
        />
        <h1>Courses list</h1>
        <CourseView
          onEditCourse={course => {
            populateCourseForm(course);
            this.setState({editCourseId: course._id});
          }}
          onRefreshCoursesList={refreshCoursesList}
        />
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
