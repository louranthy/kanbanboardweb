import  axios from 'axios';
const  {API_ENDPOINT} = process.env;
const updateTask = (item : any) => {
    return axios.put('http://localhost:3000/board/tasks', item).then(data => data);
}

export default updateTask; 