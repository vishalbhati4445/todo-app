import { db } from '../lib/prisma.js';

export type CreateTodoInput = {
  title: string;
  description?: string | null;
};

export type UpdateTodoInput = {
  title?: string;
  description?: string | null;
  completed?: boolean;
};

export const todoService = {
  /** Return all todos, newest first */
  getAll: async () => {
    return db.orm.public.Todo.orderBy((t) => t.createdAt.desc()).all();
  },

  /** Return a single todo by id, or null if not found */
  getById: async (id: number) => {
    return db.orm.public.Todo.where({ id }).first();
  },

  /** Create a new todo */
  create: async (data: CreateTodoInput) => {
    return db.orm.public.Todo.create({
      title: data.title,
      description: data.description ?? null,
      completed: false,
    });
  },

  /** Update an existing todo — returns null if not found */
  update: async (id: number, data: UpdateTodoInput) => {
    return db.orm.public.Todo.where({ id }).update({
      ...(data.title !== undefined && { title: data.title }),
      ...(data.description !== undefined && { description: data.description }),
      ...(data.completed !== undefined && { completed: data.completed }),
    });
  },

  /** Toggle the completed flag — returns null if not found */
  toggle: async (id: number) => {
    const existing = await db.orm.public.Todo.where({ id }).first();
    if (!existing) return null;

    return db.orm.public.Todo.where({ id }).update({
      completed: !existing.completed,
    });
  },

  /** Delete a todo — returns null if not found */
  delete: async (id: number) => {
    return db.orm.public.Todo.where({ id }).delete();
  },
};
