import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { TextField, NumberField } from './MuiComponents';
import { Button } from '@material-ui/core'


class CourseForm extends Component {
  
  render() {
    const { handleSubmit } = this.props;
    return(
      <form onSubmit={handleSubmit}>
        <div>
          <Field name="name" component={TextField} floatingLabelText="Course name" />
        </div>
        <div>
          <Field name="area" component={TextField} floatingLabelText="Area" />
        </div>
        <div>
          <Field name="duration" component={NumberField} min="0" step="1" floatingLabelText="Duration (months)" />
        </div>
        <Button type="submit" variant="contained" color="primary">Done</Button>
      </form>
    );
  }
}


CourseForm = reduxForm({
  form: 'course'
})(CourseForm);


export default CourseForm;
