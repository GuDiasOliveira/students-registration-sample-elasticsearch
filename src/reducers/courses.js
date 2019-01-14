import axios from 'axios';


const courses = (state = [], action) => {
  let updateListCallback = action.updateListCallback;
  switch(action.type) {
    case 'COURSE_INSERT':
      action.course._id = undefined;
      axios.post('http://localhost:9200/course/_doc/?refresh', action.course)
        .then(() => updateListCallback())
        .catch(e => {
          console.error('Failed to insert course');
          console.error(e);
        });
      break;
    case 'COURSE_UPDATE':
      let id = action.course._id;
      delete action.course._id;
      axios.put('http://localhost:9200/course/_doc/' + id + '/?refresh', action.course)
        .then(() => updateListCallback())
        .catch(e => {
          console.error('Failed to update course');
          console.error(e);
        });
      break;
    case 'COURSE_DELETE':
      axios.delete('http://localhost:9200/course/_doc/' + action.courseId + '/?refresh')
        .then(() => updateListCallback())
        .catch(e => {
          console.error('Failed to delete course');
          console.error(e);
        });
        break;
    case 'COURSE_LIST':
      return action.courses;
    default:
  }
  return state;
}

export default courses;