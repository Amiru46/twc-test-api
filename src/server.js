const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const contactRoutes = require("./routes/contactRoutes"); 
const connectDB = require("./config/db");
const cors = require("cors");

console.log("MONGO_URI:", process.env.MONGO_URI);
const app = express();


app.use(cors());
app.use(express.json());

connectDB();


app.use("/api/auth", authRoutes);
app.use("/api/contacts", contactRoutes);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(5001, () => {
  console.log("Server running on port 5000");
});