import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';


class CourseForm extends Component {
  
  render() {
    const { handleSubmit } = this.props;
    return(
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Course name</label>
          <Field name="name" component="input" type="text" />
        </div>
        <div>
          <label htmlFor="area">Area</label>
          <Field name="area" component="input" type="text" />
        </div>
        <div>
          <label htmlFor="duration">Duration (months)</label>
          <Field name="duration" component="input" type="number" min="0" step="1" />
        </div>
        <button type="submit">Done</button>
      </form>
    );
  }
}


CourseForm = reduxForm({
  form: 'course'
})(CourseForm);


export default CourseForm;
