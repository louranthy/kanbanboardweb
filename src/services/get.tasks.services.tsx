import  axios from 'axios';
const  {REACT_APP_API_ENDPOINT} = process.env;
const getTasks = () => {
    return axios.get(REACT_APP_API_ENDPOINT+ 'board/tasks').then(data => data);
}

export default getTasks; 