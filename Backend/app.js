config();
import cookieParser from 'cookie-parser';
import express from 'express';
import { config } from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import errorMiddleware from './middlewares/error.middleware.js';

const app = express();

// Middlewares
// Built-In
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Third-Party

const allowedOrigins = [
  process.env.FRONTEND_URL,
  process.env.LOCAL_FRONTEND_URL
];

app.use(
  cors({
   origin: allowedOrigins,
    credentials: true,
  })
);
app.use(morgan('dev'));
app.use(cookieParser());

// Server Status Check Route
app.get('/ping', (_req, res) => {
  res.send('Pong');
});

// Import all routes
 import userRoutes from './routes/user.routes.js';
 import courseRoutes from './routes/course.routes.js';
 import paymentRoutes from './routes/payment.routes.js';
 import miscRoutes from './routes/miscellaneous.routes.js';

 app.use('/api/v1/user', userRoutes);
 app.use('/api/v1/courses', courseRoutes);
 app.use('/api/v1/payments', paymentRoutes);
 app.use('/api/v1', miscRoutes);

// Default catch all route - 404
app.all('*', (_req, res) => {
  res.status(404).send('OOPS!!! 404 Page Not Found');
});

// Custom error handling middleware
app.use(errorMiddleware);

export default app;