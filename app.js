// app.js

require('dotenv').config();
const express = require('express');
const path = require('path');
const connectDB = require('./config/db');
const assignmentRoutes = require('./routes/assignmentRoutes');

const app = express(); // 👈 CREATE APP *BEFORE* using app.use or routes

// View engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware to parse form data (from <form> POST bodies)
app.use(express.urlencoded({ extended: true }));

// Static files
app.use(express.static(path.join(__dirname, 'public')));
app.use('/bootstrap', express.static(path.join(__dirname, 'node_modules/bootstrap')));
app.use('/jquery', express.static(path.join(__dirname, 'node_modules/jquery')));
app.use(
  '/@fortawesome',
  express.static(path.join(__dirname, 'node_modules/@fortawesome/fontawesome-free'))
);
app.use('/Content', express.static(path.join(__dirname, 'public/Content')));

// Routes
app.get('/', (req, res) => {
  res.render('home', { title: 'Home' });
});

app.use('/', assignmentRoutes);

// Start server AFTER DB connect
const PORT = process.env.PORT || 3000;

connectDB();

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
