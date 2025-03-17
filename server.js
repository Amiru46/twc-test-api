const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const auth = require('./src/routes/auth');
const contact = require('./src/routes/contacts');
const connectDB = require('./src/config/db');
const cors = require('cors');

console.log('MONGO_URI:', process.env.MONGO_URI);

const app = express();

connectDB();

app.use(
  cors({origin: 'http://localhost:3000',credentials: true,})
);
app.use(express.json());


app.use('/api/auth', auth);
app.use('/api/contacts', contact);

const PORT = process.env.PORT || 5000;

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});


app.listen(5000, () => {
  console.log('Server running on port 5000');
});