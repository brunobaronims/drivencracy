import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import pollsRoute from './routes/polls.route.js';

const app = express();
app.use(express.json());
app.use(cors());
app.use(pollsRoute);

const port = process.env.PORT || 3333;

app.listen(port, () => console.log(`Server running on port ${port}`));