import express from 'express';
import { config } from 'dotenv';
import { userRoutes } from './routes/user.route.js';

config();

const app = express();

app.use(express.json());
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("WELCOME TO SOLACE FOOD DELIVERY APP.");
});

// app.use('/api/v1', userRoutes);

app.listen(port, () => {
  console.log(`Server running on: http://localhost:${port}`);
});