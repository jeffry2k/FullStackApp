import React, { useState, useRef, useEffect } from "react";
import AuthService from "../services/auth.service";
import TaskService from "../services/task.service";
import Form from "react-validation/build/form";
import TextArea from "react-validation/build/textarea";
import Input from "react-validation/build/input";
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import CheckButton from "react-validation/build/button";

const required = (value) => {
    if (!value) {
        return (
        <div className="alert alert-danger" role="alert">
            This field is required!
        </div>
        );
    }
};

const currentUser = AuthService.getCurrentUser();    

const CreateTask = (props) => {   
    const form = useRef();
    const checkBtn = useRef();
    const titleTask = props.match.params.id ? "Edit Task" :  "Create New Task";
  
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [date, setDate] = useState(new Date());
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        if (props.match.params.id) {  
            TaskService.getTask(props.match.params.id)
            .then(
                (response) => {
                    console.log(response.data.task[0]);
                    console.log(response.data.task);
                    setTitle(response.data.task[0].title);
                    setContent(response.data.task[0].content);
                    setDate(new Date(response.data.task[0].date));                
                },
                (error) => {
                    setTitle('');
                    setContent('');
                    setDate('')  
                }
            );              
        }
      }, []);    


    const onChangeTitle = (e) => {
      const title = e.target.value;
      setTitle(title);
    };
  
    const onChangeContent = (e) => {
      const content = e.target.value;
      setContent(content);
    };

    const onChangeDate = dateNew => {
        console.log(dateNew);
        setDate(dateNew);
    };    
  
    const handleCreateTask = (e) => {
      e.preventDefault();
  
      setMessage("");
      setLoading(true);
  
      form.current.validateAll();
  
      if (checkBtn.current.context._errors.length === 0) {
        if (props.match.params.id) {  
            TaskService.updateTask(props.match.params.id, title, content, date).then(
                () => {
                    props.history.push("/tasks");
                    window.location.reload();
                },
                (error) => {
                    const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();
        
                    setLoading(false);
                    setMessage(resMessage);
                }
                );
        } else {
            TaskService.createTask(title, content, date, currentUser.id).then(
            () => {
                props.history.push("/tasks");
                window.location.reload();
            },
            (error) => {
                const resMessage =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
    
                setLoading(false);
                setMessage(resMessage);
            }
            );
        }
      } else {
        setLoading(false);
      }
    };

    return (
        <div className="col-md-12">
            <div className="card card-container">
                <h4 className="m-auto p-2">{titleTask}</h4>
                <img
                    src="https://d3ptyyxy2at9ui.cloudfront.net/d2043167d727a78186d9f8e734590f5a.png"
                    alt="profile-img"
                    className="profile-img-card"
                />
                <Form onSubmit={handleCreateTask} ref={form}>
                <div className="form-group">
                    <Input
                        type="text" 
                        className="form-control" 
                        placeholder="Tittle" 
                        name="title"
                        onChange={onChangeTitle}
                        value={title}
                        validations={[required]}/>
                </div>

                <div className="form-group">
                    <TextArea 
                        name="content"
                        className="form-control"
                        placeholder="Content"
                        onChange={onChangeContent}
                        value={content}
                        validations={[required]} />                            
                </div>
                <div className="form-group">
                    <DatePicker 
                        className="form-control"
                        placeholder="Date"
                        selected={date}
                        onChange={onChangeDate}
                        validations={[required]}/>
                </div>

                <div className="form-group">
                    <button className="btn btn-primary btn-block" disabled={loading}>
                    {loading && (
                        <span className="spinner-border spinner-border-sm"></span>
                    )}
                    <span>Save</span>
                    </button>
                </div>

                {message && (
                    <div className="form-group">
                    <div className="alert alert-danger" role="alert">
                        {message}
                    </div>
                    </div>
                )}
                <CheckButton style={{ display: "none" }} ref={checkBtn} />                    
                </Form>
            </div>
        </div>
    );
}

export default CreateTask;