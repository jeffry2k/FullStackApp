import { Schema, model, Document } from 'mongoose';

export interface ITask extends Document {
    title: String,
    content: String,
    author: String,
    date: Date    
  };
  
  const taskSchema = new Schema<ITask>({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    }
  }, {
    timestamps: true
  });
  
  export default model<ITask>('task', taskSchema);
  
/*
const mongoose = require("mongoose");

const Task = mongoose.model(
    "Task",
    new mongoose.Schema({
        title: String,
        content: String,
        author: String,
        date: Date
    }, {
        timestamps: true
    })
  );
  
  module.exports = Task;
  */