import axios from "axios";
import authHeader from './auth.header'

const API_URL = "http://localhost:4000/api/task/";

  const getTasks = async(id) => {
    return await axios
      .get(API_URL + "all/" + id, { 
        headers: authHeader() 
      })
      .then((response) => {
        return response;
      })
  };

  const getTask = async(id) => {
    return await axios
      .get(API_URL + "getTask/" + id, { 
        headers: authHeader() 
      })
      .then((response) => {
        return response;
      })      
  };  

const deleteTask = async(idTask) => {
  return await axios.delete(API_URL + "delete/" + idTask, { headers: authHeader() })
}

const updateTask = async(idTask, title, content, date) => {
  if (date === '') {
    date = new Date();
  }
  const updatedTask = {
    title,
    content,
    date
  }   
  return await axios.put(API_URL + "update/" + idTask, updatedTask,  { headers: authHeader() })
}

const createTask = async(title, content, date, author) => {
  if (date === '') {
    date = new Date();
  }
  const newTask = {
    title,
    content,
    date,
    author
  }     
  return await axios.post(API_URL + "create",  newTask, { headers: authHeader() })
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