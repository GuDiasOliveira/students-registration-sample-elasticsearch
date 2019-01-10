import React, { Component } from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import { connect } from 'react-redux';


const mapStateToProps = state => (
  {courses: state.courses}
);


class CoursesView extends Component {

  render() {
    const { courses } = this.props;
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