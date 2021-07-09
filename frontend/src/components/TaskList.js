import React, { useState, useEffect } from "react";
import AuthService from "../services/auth.service";
import TaskService from "../services/task.service";
import {format} from 'timeago.js'
import {Link} from 'react-router-dom'

const TaskList = (props) => {
    const currentUser = AuthService.getCurrentUser();    
    const [content, setContent] = useState("");
    useEffect(() => {
      getTasks();
    }, []);

    const getTasks = () => {
      TaskService.getTasks(currentUser.id).then(
        (response) => {  
          let obj = [];
          let obj1 = [];
          for(let i=0; i < response.tasks.length; i++){   
            obj1 = response.tasks[i];        
            obj[i] = obj1;                       
          }          
          setContent(obj);
        },
        (error) => {
          const _content = '';  
          setContent(_content);
        }
      );      
    }     

    const deleteTask = (id) => { 
      TaskService.deleteTask(id).then(
        (response) => {  
          getTasks();
        },
        (error) => {
          const _content =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
            setContent(_content);
        }
      );
    };    

    if(currentUser) {
      console.log(content);
      if(content) {
        return (
          <div className="row"> {
            content.map(task => (            
                <div className="col-md-4 p-2" key={task._id}>
                    <div className="card p-0">
                      <div className="card-body">
                          <div className="card-header d-flex justify-content-between">
                              <h5>{task.title}</h5>
                              <Link 
                                  className="btn btn-secondary"
                                  to={"/edit/" + task._id}>
                                  Edit
                              </Link>
                          </div>
                          <p>{task.content}</p>
                          <p>{format(task.date)}</p>
                      </div>
                      <div className="card-footer">
                          <button className="btn btn-danger" onClick={() => [deleteTask(task._id)]}>
                              Delete
                          </button>
                      </div>
                  </div>
                </div>
            ))    
          } 
          </div>         
        );
      } else {
        return (
          <div className="container">
          <header className="jumbotron">
            <h3>There is not pending tasks yet</h3>
          </header>
        </div>          
        )
      }
    } else {
      return null;
    }
};

export default TaskList;
