
let coursesIdCount = 0;

const courses = (state = [], action) => {
  switch(action.type) {
    case 'COURSE_INSERT':
      action.course._id = ++coursesIdCount;
      return [...state, action.course];
    case 'COURSE_UPDATE':
      return state.map(course => {
        return course._id === action.course._id ? action.course : course;
      });
    case 'COURSE_DELETE':
      return state.filter(course => {
        return course._id !== action.courseId;
      });
    default:
      return state;
  }
}

export default courses;