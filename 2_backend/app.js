import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/UserModel.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT;

// Middlewares
app.use(cors());
app.use(express.json());

// Connecting to MongoDB and Starting server

mongoose
  .connect(process.env.MONGODB_URI)
  .then((result) =>
    app.listen(PORT, () =>
      console.log(`Connected to mongoDB. Server is running on port ${PORT} `)
    )
  )
  .catch((err) => console.log(err));

// ROUTES

app.get('/', (req, res) => res.send('API is running...'));

// GET
//  get all users
app.get('/users', async (req, res) => {
  try {
    let users = await User.find({});
    if (users) {
      res.send(users);
    }
  } catch (err) {
    console.log(err);
  }
});

// POST
//  add new user
app.post('/users', async (req, res) => {
  if (!req.body) return res.status(400).json({ message: 'missing user input' });
  const users = await User.find();

  const userExists = users.some((user) => user.email === req.body.email);
  if (userExists) {
    res.json({
      status: 'failed',
      message: 'Toks el.paštas jau užregistruotas',
    });
  } else {
    try {
      const user = new User(req.body);
      await user.save();
      const users = await User.find();
      res.json({
        status: 'success',
        users: users,
      });
    } catch (error) {
      console.log(error);
    }
  }
});

// PUT
//  update single user
app.put('/users', async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).json({ message: 'trūksta vartotojo įvesties' });
    }

    console.log(req.body);
    const { _id } = req.body;
    let update = req.body;

    await User.findOneAndUpdate({ _id: _id }, update);
    const users = await User.find();

    res.json({ message: 'vartotojas atnajintas', users: users });
  } catch (error) {
    console.log(error);
  }
});

// DELETE: Delete single user based on id

app.delete('/users/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const deletedUser = await User.findByIdAndDelete(userId);
    res.json({ message: 'vartotojas ištrintas' });
  } catch (err) {
    console.log(err);
    res.json({ message: 'ištrinti nepavyko' });
  }
});
