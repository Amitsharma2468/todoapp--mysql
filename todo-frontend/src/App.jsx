import { useEffect, useState } from 'react';
import './App.css';
import Tasks from './component/Tasks';
import axios from 'axios';

function App() {
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskStatus, setTaskStatus] = useState('');
  const [tasklist, setTasklist] = useState([]);
  const APIURL = 'http://localhost:3000/tasks';
  
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(APIURL);
      setTasklist(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  const addTasks = async () => {
    const body = {title: taskTitle, description: taskDescription, status: taskStatus};
    try {
      await axios.post(APIURL, body);
      setTaskTitle('');
      setTaskDescription('');
      setTaskStatus('');
      await fetchTasks();
    } catch (error) {
      console.log(error);
    }
  }

  const delTasks = async (id) => {
    try {
      await axios.delete(`${APIURL}/${id}`);
      fetchTasks();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <h1>TODO With MYSQL DB</h1>
      <div>
        <input 
          type="text" 
          placeholder='Title' 
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
        />
        <input 
          type="text" 
          placeholder='Description' 
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
        />
        <input 
          type="text" 
          placeholder='Status' 
          value={taskStatus}
          onChange={(e) => setTaskStatus(e.target.value)}
        />
        <button onClick={addTasks}>Add Task</button>
      </div>
      {
        tasklist.length === 0 ? (
          <strong>No task available</strong>
        ):(
          <>
            <Tasks
              title="Title"
              description="Description"
              status="Status"
              del={false}
            />
            {tasklist.map(task => (
              <Tasks
                key={task.id}
                title={task.title}
                description={task.description}
                status={task.status}
                delfunc={() => delTasks(task.id)}
              />
            ))}
          </>
        )
      }
    </>
  );
  
}

export default App;
