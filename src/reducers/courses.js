
let coursesIdCount = 0;

const courses = (state = [], action) => {
  switch(action.type) {
    case 'COURSE_INSERT':
      action.course._id = ++coursesIdCount;
      return [...state, action.course];
    default:
      return state;
  }
}

export default courses;