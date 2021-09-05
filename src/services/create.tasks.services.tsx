import  axios from 'axios';
const  {REACT_APP_API_ENDPOINT} = process.env;
const createTask = (item : any) => {
    return axios.post(REACT_APP_API_ENDPOINT+'board/tasks', item).then(data => data);
}

export default createTask; 