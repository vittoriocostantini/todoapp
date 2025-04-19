import express from 'express';
const router = express.Router();
import Task from '../models/Task.mjs';

// Crear una nueva tarea
router.post('/tasks', async (req, res) => {
  try {
    console.log('Datos recibidos en req.body:', req.body);
    if (!req.body.priority) {
      return res.status(400).send({ error: 'Priority is required' });
    }
    const task = new Task(req.body);
    await task.save();
    res.status(201).send(task);
  } catch (error) {
    console.error('Error al guardar la tarea:', error);
    res.status(400).send(error);
  }
});

// Obtener todas las tareas
router.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.send(tasks);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Actualizar una tarea
router.patch('/tasks/:id', async (req, res) => {
  try {
    if (!req.body.priority) {
      return res.status(400).send({ error: 'Priority is required' });
    }
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!task) {
      return res.status(404).send();
    }
    res.send(task);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Eliminar una tarea
router.delete('/tasks/:id', async (req, res) => {
  try {
    console.log(`Attempting to delete task with ID: ${req.params.id}`);
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      console.log(`Task with ID ${req.params.id} not found.`);
      return res.status(404).send({ error: 'Task not found' });
    }
    console.log(`Task with ID ${req.params.id} deleted successfully.`);
    res.send(task);
  } catch (error) {
    console.error('Error al eliminar la tarea:', error);
    res.status(500).send({ error: 'Internal server error' });
  }
});

export default router;