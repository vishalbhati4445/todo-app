import { Router } from 'express';
import {
  getAllTodos,
  getTodoById,
  createTodo,
  updateTodo,
  toggleTodo,
  deleteTodo,
} from '../controllers/todoController.js';

const router = Router();

router.get('/', getAllTodos);           // GET    /api/todos
router.get('/:id', getTodoById);        // GET    /api/todos/:id
router.post('/', createTodo);           // POST   /api/todos
router.put('/:id', updateTodo);         // PUT    /api/todos/:id
router.patch('/:id/toggle', toggleTodo);// PATCH  /api/todos/:id/toggle
router.delete('/:id', deleteTodo);      // DELETE /api/todos/:id

export default router;
