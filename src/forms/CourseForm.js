import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { TextField } from './MuiComponents';
import { Button } from '@material-ui/core'

import { connect } from 'react-redux';

import axios from 'axios';


const mapDispatchToProps = dispatch => ({
  handleSaveCourse: (values, updateListCallback) => {
    if (values._id)
      dispatch({ type: 'COURSE_UPDATE', course: values, updateListCallback });
    else
      dispatch({ type: 'COURSE_INSERT', course: values, updateListCallback });
  },
  refreshCoursesList: courses => {
    if (courses)
      dispatch({ type: 'COURSE_LIST', courses });
    else
      axios.get('http://localhost:9200/_search?index=course')
        .then(response => (response.data.hits.hits.map(hit => ({_id: hit._id, ...hit._source}))))
        .then(courses2 => dispatch({ type: 'COURSE_LIST', courses: courses2 }))
        .catch(err => {
          console.error('Failed to retrieve courses');
          console.error(err);
        })
  }
});


class CourseForm extends Component {

  constructor(props) {
    super(props);
    this.props.refreshCoursesList();
  }

  submitForm(values) {
    values._id = this.props.editCourseId;
    this.props.handleSaveCourse(values, this.props.refreshCoursesList);
    this.props.setToCreateMode();
    this.props.initialize({});
  }
  
  render() {
    const { handleSubmit, editCourseId } = this.props;
    return(
      <form onSubmit={handleSubmit(this.submitForm.bind(this))}>
        <div>
          <Field name="name" component={TextField} floatingLabelText="Course name" />
        </div>
        <div>
          <Field name="area" component={TextField} floatingLabelText="Area" />
        </div>
        <div>
          <Field name="duration" component={TextField} floatingLabelText="Duration (months)" />
        </div>
        <Button type="submit" variant="contained" color="primary">{editCourseId ? `Update #${editCourseId}` : 'New'}</Button>
      </form>
    );
  }
}

CourseForm = reduxForm({
  form: 'course'
})(CourseForm);

CourseForm = connect(
  undefined,
  mapDispatchToProps
)(CourseForm);


export default CourseForm;
