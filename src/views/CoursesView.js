import React, { Component } from 'react';

import { Button } from '@material-ui/core';
import { TableRow, TableHead, TableCell, TableBody, Table } from '@material-ui/core';

import DeleteIcon from '@material-ui/icons/Delete';

import { connect } from 'react-redux';


const mapStateToProps = state => (
  {courses: state.courses}
);


class CoursesView extends Component {

  render() {
    const { courses, dispatch } = this.props;
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
                <Button vairant="contained" onClick={() => dispatch({type: 'COURSE_DELETE', courseId: course._id})}>
                  <DeleteIcon />
                </Button>
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