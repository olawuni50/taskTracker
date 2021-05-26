import {useState} from "react"
import {BrowserRouter as Router, Route} from "react-router-dom"
import Header from './components/Header';
import Tasks from './components/Tasks';
import AddTasks from './components/AddTasks';
import Footer from "./components/Footer";
import About from "./components/About";


const App =()=> {
  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTask] =useState([
  {
    id:1,
    text: "Doctors Appointment",
    day: "Feb 5th at 2:30px",
    reminder:true,
},
{
    id:2,
    text: "Meeting at school",
    day: "Feb 6th at 1:30pm",
    reminder:true,

},
{
    id:3,
    text: "Food Shopping",
    day: "Feb 5th at 2:30pm",
    reminder:false,
}
])

// Add Task
const addTask = (task)=>{
  const id = Math.floor(Math.random() * 10000) + 1
  const newTask = {id, ...task}
  setTask([...tasks, newTask])
}


// Delete Task
const deleteTask = (id) => {
  setTask(tasks.filter((task)=> task.id !== id))
}

// Toggle Reminder
const toggleReminder = (id)=>{
  setTask(
  tasks.map((task)=>
  task.id===id ? {...task, reminder: !task.reminder} : task))
}


  return (
    <Router>
          <div className="container">
     <Header onAdd={() => setShowAddTask(!showAddTask)} showAdd={showAddTask}/>
    
     <Route path="/" exact render={(props)=>(
       <>
       {showAddTask &&<AddTasks onAdd={addTask}/>}
     {tasks.length > 0 ? (
     <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder}/>) : ("No task to display")}
       </>
     )}/>
     <Route path="/about" component={About}/>
     <Footer/>
    </div>
    </Router>
  );
}

export default App;
