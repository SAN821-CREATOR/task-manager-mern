import React, {useState,useEffect} from "react";
import axios from "axios";

function App(){

const [tasks,setTasks]=useState([]);
const [title,setTitle]=useState("");

useEffect(()=>{
fetchTasks();
},[]);

const fetchTasks=async()=>{
const res=await axios.get("http://localhost:5000/tasks");
setTasks(res.data);
}

const addTask=async()=>{
if(title==="") return;

await axios.post("http://localhost:5000/tasks",{title});
setTitle("");
fetchTasks();
}

const deleteTask=async(id)=>{
await axios.delete("http://localhost:5000/tasks/"+id);
fetchTasks();
}

return(
<div style={{textAlign:"center",marginTop:"50px"}}>

<h2>Task Manager</h2>

<input
value={title}
onChange={(e)=>setTitle(e.target.value)}
placeholder="Enter task"
/>

<button onClick={addTask}>Add</button>

<ul>

{tasks.map(task=>(
<li key={task._id}>
{task.title}

<button onClick={()=>deleteTask(task._id)}>
Delete
</button>

</li>
))}

</ul>

</div>
);
}

export default App;