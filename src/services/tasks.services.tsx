import  axios from 'axios';
const getTasks = () => {
   return axios.get('http://localhost:3000/board/tasks');
}

export default getTasks; 