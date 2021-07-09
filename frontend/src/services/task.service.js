import axios from "axios";
import authHeader from './auth.header'

const API_URL = "http://localhost:4000/api/task/";

  const getTasks = (id) => {
    return axios
      .get(API_URL + "all/" + id, { 
        headers: authHeader() 
      })
      .then((response) => {
        return response.data;
      })
  };

  const getTask = (id) => {
    return axios
      .get(API_URL + "getTask/" + id, { 
        headers: authHeader() 
      })
      .then((response) => {
        return response.data;
      })      
  };  

const deleteTask = (idTask) => {
  return axios.delete(API_URL + "delete/" + idTask, { headers: authHeader() })
}

const updateTask = (idTask, title, content, date) => {
  if (date === '') {
    date = new Date();
  }
  const updatedTask = {
    title,
    content,
    date
  }   
  console.log(updatedTask);
  return axios.put(API_URL + "update/" + idTask, updatedTask,  { headers: authHeader() })
}

const createTask = (title, content, date, author) => {
  if (date === '') {
    date = new Date();
  }
  const newTask = {
    title,
    content,
    date,
    author
  }     
  return axios.post(API_URL + "create",  newTask, { headers: authHeader() })
}

const getTaskId = () => {
  return JSON.parse(sessionStorage.getItem("taskId"));
};

const removeTaskId = () => {
  localStorage.removeItem("taskId");
};

export default {
    getTasks,
    deleteTask,
    createTask,
    updateTask,
    getTask,
    getTaskId,
    removeTaskId
};  