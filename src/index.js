import express from 'express';
import routes from './routes/index.js';
import dotenv from 'dotenv';
import connectDB from './connect.js';

import cors from 'cors';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(cors());


app.use('/api', routes);

connectDB();

app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).json({ status: 500, message: error.message , data:null  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});




// get= http://localhost:3000/api/notes
