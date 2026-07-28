const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect("mongodb://127.0.0.1:27017/taskmanager")
.then(()=>console.log("MongoDB Connected"))
.catch(err=>console.log(err));

const TaskSchema = new mongoose.Schema({
    title: String,
    completed: Boolean
});

const Task = mongoose.model("Task", TaskSchema);

app.get("/tasks", async (req,res)=>{
    const tasks = await Task.find();
    res.json(tasks);
});

app.post("/tasks", async (req,res)=>{
    const task = new Task({
        title: req.body.title,
        completed:false
    });

    await task.save();
    res.json(task);
});

app.delete("/tasks/:id", async(req,res)=>{
    await Task.findByIdAndDelete(req.params.id);
    res.json({message:"Task deleted"});
});

app.listen(5000,()=>{
    console.log("Server running on port 5000");
});