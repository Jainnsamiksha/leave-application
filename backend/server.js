// server.js

import express from 'express';
import cors from 'cors';
import userRouter from './route/userRouter.js';

const app = express();
const port = 4000;

app.use(cors({
  origin: "http://localhost:3000",
  methods: ['GET, PUT'],
}));
app.use(express.json()); // Parse JSON bodies
app.use('/api', userRouter); // Mount the userRouter under the /api prefix

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
