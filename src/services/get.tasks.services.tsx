import  axios from 'axios';
const  {API_ENDPOINT} = process.env;
const getTasks = () => {
   console.log(API_ENDPOINT)
    return axios.get('http://localhost:3000/board/tasks').then(data => data);
}

export default getTasks; 