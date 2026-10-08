import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import todoRoutes from './routes/todoRoutes.js';

dotenv.config();

const app = express();

// Allow requests from the React dev server and any localhost port
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:5173', // Vite default
  'http://localhost:5174',
  process.env.FRONTEND_URL,
].filter(Boolean) as string[];

app.use(
  cors({
    origin: (origin, callback) => {
      // allow non-browser clients (curl, Postman) and whitelisted origins
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error(`CORS: origin ${origin} not allowed`));
      }
    },
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

app.use(express.json());

// Health check
app.get('/', (_req, res) => {
  res.json({ health: 'ok' });
});

// Todo API
app.use('/api/todos', todoRoutes);

export default app;
