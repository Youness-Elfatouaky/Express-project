const express = require('express');
const router = express.Router();

let tasks = []; // In-memory store for tasks

// POST /tasks to add a new task
router.post('/', (req, res) => {
  const newTask = req.body;
  if (!newTask.name || !newTask.status) {
    return res.status(400).json({ error: 'Task name and status are required' });
  }
  newTask.id = tasks.length + 1; // Assign a unique ID to the new task
  tasks.push(newTask); // Add task to the list
  res.status(201).json(newTask); // Respond with the added task
});

// GET /tasks to fetch all tasks
router.get('/', (req, res) => {
  res.json(tasks); // Respond with the list of tasks
});

// PUT /tasks/:id to update a task
router.put('/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const updatedTask = req.body;

  let task = tasks.find((t) => t.id === taskId);

  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }

  task.name = updatedTask.name || task.name;
  task.status = updatedTask.status || task.status;

  res.json(task); // Respond with the updated task
});

// DELETE /tasks/:id to delete a task
router.delete('/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  tasks = tasks.filter((task) => task.id !== taskId);

  res.status(204).send(); // No content, just delete
});

module.exports = router;
