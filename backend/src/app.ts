import express, { Application } from 'express'
import cors from 'cors';
import authRoutes from './routes/auth.routes';
import taskRoutes from './routes/task.routes';

const app: Application = express();

//settings
const PORT = process.env.PORT || 4000;
app.set('port', PORT);

var corsOptions = {
    origin: "http://localhost:3000"
};

//middlewares
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//routes
// simple route
app.use('/api/auth',authRoutes);
app.use('/api/task',taskRoutes);

export default app;