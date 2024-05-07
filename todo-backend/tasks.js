const express = require('express');
const router = express.Router();

const mysql = require('mysql')

// MySQL connection
const connection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'todo-app',
    password:""
});
connection.connect(err => {
    if (err) {
      console.error('Error connecting to MySQL database:', err);
      return;
    }
    console.log('Connected to MySQL database');
  });
  
// Get all tasks
router.get('/', async (req, res) => {
    try {
        const [rows] = await connection.query('SELECT * FROM tasks');
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// Add new task
router.post('/', async (req, res) => {
    const { task_name } = req.body;
    try {
        await connection.query('INSERT INTO tasks (task_name) VALUES (?)', [task_name]);
        res.status(201).send();
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// Update task
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { task_name, completed } = req.body;
    try {
        await connection.query('UPDATE tasks SET task_name = ?, completed = ? WHERE id = ?', [task_name, completed, id]);
        res.status(200).send();
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// Delete task
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await connection.query('DELETE FROM tasks WHERE id = ?', [id]);
        res.status(200).send();
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;
