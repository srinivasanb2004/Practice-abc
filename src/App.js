import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [tasks, setTasks] = useState([]); // State for tasks
  const [currentTask, setCurrentTask] = useState(''); // State for the input value
  const [isEditing, setIsEditing] = useState(false); // Editing state
  const [editId, setEditId] = useState(null); // ID of task being edited

  // Add a new task
  const addTask = () => {
    if (currentTask.trim() === '') return;
    setTasks([...tasks, { id: Date.now(), text: currentTask }]);
    setCurrentTask('');
  };

  // Delete a task
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Start editing a task
  const startEdit = (id, text) => {
    setIsEditing(true);
    setEditId(id);
    setCurrentTask(text);
  };

  // Update a task
  const updateTask = () => {
    if (currentTask.trim() === '') return;
    setTasks(
      tasks.map((task) =>
        task.id === editId ? { ...task, text: currentTask } : task
      )
    );
    setIsEditing(false);
    setEditId(null);
    setCurrentTask('');
  };

  return (
    <div className="App">
      <h1>To-Do List</h1>
      <div className="input-container">
        <input
          type="text"
          value={currentTask}
          onChange={(e) => setCurrentTask(e.target.value)}
          placeholder="Enter a task"
        />
        {isEditing ? (
          <button onClick={updateTask}>Update</button>
        ) : (
          <button onClick={addTask}>Add</button>
        )}
      </div>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.text}
            <div className="actions">
              <button onClick={() => startEdit(task.id, task.text)}>Edit</button>
              <button onClick={() => deleteTask(task.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
