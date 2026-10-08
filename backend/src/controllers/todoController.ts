import { Request, Response } from 'express';
import { todoService } from '../services/todoService.js';

// GET /api/todos
export async function getAllTodos(req: Request, res: Response) {
  try {
    const todos = await todoService.getAll();
    res.json(todos);
  } catch (err) {
    console.error('[getAllTodos]', err);
    res.status(500).json({ error: 'Failed to fetch todos' });
  }
}

// GET /api/todos/:id
export async function getTodoById(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) return res.status(400).json({ error: 'Invalid id' });

    const todo = await todoService.getById(id);
    if (!todo) return res.status(404).json({ error: 'Todo not found' });

    res.json(todo);
  } catch (err) {
    console.error('[getTodoById]', err);
    res.status(500).json({ error: 'Failed to fetch todo' });
  }
}

// POST /api/todos
export async function createTodo(req: Request, res: Response) {
  try {
    const { title, description } = req.body as { title?: string; description?: string };

    if (!title || typeof title !== 'string' || title.trim() === '') {
      return res.status(400).json({ error: 'title is required' });
    }

    const todo = await todoService.create({ title: title.trim(), description });
    res.status(201).json(todo);
  } catch (err) {
    console.error('[createTodo]', err);
    res.status(500).json({ error: 'Failed to create todo' });
  }
}

// PUT /api/todos/:id
export async function updateTodo(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) return res.status(400).json({ error: 'Invalid id' });

    const { title, description, completed } = req.body as {
      title?: string;
      description?: string;
      completed?: boolean;
    };

    const todo = await todoService.update(id, { title, description, completed });
    if (!todo) return res.status(404).json({ error: 'Todo not found' });

    res.json(todo);
  } catch (err) {
    console.error('[updateTodo]', err);
    res.status(500).json({ error: 'Failed to update todo' });
  }
}

// PATCH /api/todos/:id/toggle
export async function toggleTodo(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) return res.status(400).json({ error: 'Invalid id' });

    const todo = await todoService.toggle(id);
    if (!todo) return res.status(404).json({ error: 'Todo not found' });

    res.json(todo);
  } catch (err) {
    console.error('[toggleTodo]', err);
    res.status(500).json({ error: 'Failed to toggle todo' });
  }
}

// DELETE /api/todos/:id
export async function deleteTodo(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) return res.status(400).json({ error: 'Invalid id' });

    const result = await todoService.delete(id);
    if (!result) return res.status(404).json({ error: 'Todo not found' });

    res.status(204).send();
  } catch (err) {
    console.error('[deleteTodo]', err);
    res.status(500).json({ error: 'Failed to delete todo' });
  }
}
