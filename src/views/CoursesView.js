import React, { Component } from 'react';

import { Button } from '@material-ui/core';
import { TableRow, TableHead, TableCell, TableBody, Table } from '@material-ui/core';

import { Delete as DeleteIcon, Edit as EditIcon } from '@material-ui/icons';

import { connect } from 'react-redux';


const mapStateToProps = state => (
  {courses: state.courses}
);


class CoursesView extends Component {

  render() {
    const { courses, dispatch, onEditCourse } = this.props;
    return(
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>#ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Area</TableCell>
            <TableCell>Duration (months)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {courses.map(course => (
            <TableRow>
              <TableCell>{course._id}</TableCell>
              <TableCell>{course.name}</TableCell>
              <TableCell>{course.area}</TableCell>
              <TableCell>{course.duration}</TableCell>
              <TableCell>
                <span>
                  <Button vairant="secondary" onClick={() => dispatch({type: 'COURSE_DELETE', courseId: course._id})}>
                    <DeleteIcon />
                  </Button>
                  <Button variant="primary" onClick={ () => onEditCourse(course) }>
                    <EditIcon />
                  </Button>
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }
}

CoursesView = connect(
  mapStateToProps
)(CoursesView);


export default CoursesView;