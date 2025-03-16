const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes"); // Correct path
const contactRoutes = require("./routes/contactRoutes"); // Correct path
const connectDB = require("./config/db"); // Correct path
const cors = require("cors");


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

app.listen(5000, () => {
  console.log("Server running on port 5000");
});