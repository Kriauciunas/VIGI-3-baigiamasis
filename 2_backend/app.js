const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT;

const User = require('./models/UserModel');

// Midilwares
app.use(cors());
app.use(express.json());

// Connecting to mongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then((result) =>
    app.listen(PORT, () =>
      console.log(`Connected to mongoDB. Server is running on port ${PORT} `)
    )
  )
  .catch((err) => console.log(err));

// ROUTES
// GET: test
app.get('/', (req, res) => res.send('API is running...'));

// GET: get all users
app.get('/api/users', (req, res) => {
  User.find({}).then((data) => res.json(data));
});

// POST
// -- add new user
app.post('/api/users', (req, res) => {
  const userData = req.body; // user data from frontend

  // saving new user
  const user = new User(userData);

  user
    .save()
    .then((result) => res.send({ message: 'User saved' }))
    .catch((err) => res.send({ message: 'User not saved, try again latter' }));
});

// PUT
// -- update single user
app.put('/api/users/:id', (req, res) => {
  const userId = req.params.id;
  const updatedUser = req.body;

  User.findByIdAndUpdate(userId, updatedUser)
    .then((result) => res.json({ message: 'User updated' }))
    .catch((err) => res.json({ message: 'User not updated, try again later' }));
});
