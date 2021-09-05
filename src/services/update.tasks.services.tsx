import  axios from 'axios';
const  {REACT_APP_API_ENDPOINT} = process.env;
const updateTask = (item : any) => {
    return axios.put(REACT_APP_API_ENDPOINT+'board/tasks', item).then(data => data);
}

export default updateTask; 