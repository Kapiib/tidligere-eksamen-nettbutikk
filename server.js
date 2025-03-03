const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require("dotenv").config();
const app = express();
const connectDB = require('./db/dbConfig');
const dotenv = require('dotenv');
const path = require('path');
const ejs = require('ejs');
const PORT = process.env.PORT
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

connectDB();

const getRoutes = require('./routes/getRoutes');
const authRoutes = require('./routes/authRoutes');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// use routes
app.use("/", getRoutes);
app.use("/auth", authRoutes);

// Server
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`)
})