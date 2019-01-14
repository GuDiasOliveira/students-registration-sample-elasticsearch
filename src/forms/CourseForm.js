import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { TextField } from './MuiComponents';
import { Button } from '@material-ui/core'

import { connect } from 'react-redux';


const mapDispatchToProps = dispatch => ({
  handleSaveCourse: (values, updateListCallback) => {
    if (values._id)
      dispatch({ type: 'COURSE_UPDATE', course: values, updateListCallback });
    else
      dispatch({ type: 'COURSE_INSERT', course: values, updateListCallback });
  },
});


class CourseForm extends Component {

  submitForm(values) {
    values._id = this.props.editCourseId;
    this.props.handleSaveCourse(values, this.props.onRefreshCoursesList);
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
