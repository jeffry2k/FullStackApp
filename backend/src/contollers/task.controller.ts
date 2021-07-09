import { Request, Response } from 'express'
import Task, {ITask} from '../models/task.model';

export const createTask = async (req: Request, res: Response) => {
    try {
        const { title, content, date, author } = req.body;
        const newTask: ITask = new Task({
            title,
            content,
            date,
            author
        });
        await newTask.save(); 
        res.status(200).send({ message: "New Task added!" });   
    } catch (err) {
        res.status(500).send({ message: err });
    }
}

export const getTasks = async (req: Request, res: Response) => {
    try {
        const tasks = await Task.find({author: req.params.id});
        if(tasks.length <= 0) return res.status(400).send({ message: "Tasks Not found."});
        res.status(200).send({tasks});      
    } catch (err) {
        res.status(500).send({ message: err });
    }
}

export const getTask = async (req: Request, res: Response) => {
    try {
        const task = await Task.find({_id: req.params.id})
        if(!task) return res.status(404).send({ message: "Task Not found."});
        res.status(200).send({task});      
    } catch (err) {
        res.status(500).send({ message: err });
    }    
}

export const deleteTask = async (req: Request, res: Response) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id)
        res.status(200).send({ message: "Task Deleted!"});    
    } catch (err) {
        res.status(500).send({ message: err });
    }    
}

export const updateTask = async (req: Request, res: Response) => {
    try {
    const { title, content, date } = req.body;  
    await Task.findByIdAndUpdate(req.params.id, {
        title,
        content,
        date
    });    
    res.status(200).send({ message: "Task Updated!"});       
    } catch (err) {
        res.status(500).send({ message: err });
    }
}