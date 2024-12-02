import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import cors from 'cors';
import { Administration } from './models/administration.js';
import { Registration } from './models/registration.js';
import dotenv from 'dotenv';
const app = express();
const PORT = process.env.PORT || 5000;

dotenv.config();

const secret= process.env.JWT_SECRET;

mongoose.connect("mongodb://localhost:27017/Raport", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

const allowedOrigins = ['http://localhost:3001', 'http://localhost:3002'];
app.use(cors({ origin: allowedOrigins }));

app.use(express.json());

app.post('/register', async (req, res) => {
  const { username, password, role = 'user' } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new Administration({ username, password: hashedPassword, role });

  try {
    await user.save();
    res.status(201).send('User registered');
  } catch (err) {
    res.status(400).send('Error registering user: ' + err.message);
  }
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
      const administration = await Administration.findOne({ username });
      if (!administration) {
          return res.status(401).send('Invalid credentials');
      }
      const passwordMatch = await bcrypt.compare(password, administration.password);
      if (!passwordMatch) {
          return res.status(401).send('Invalid credentials');
      }
      const role = administration.role;
      const category = administration.category;
      const token = jwt.sign({ _id: administration._id, username: administration.username, role }, secret);
      res.json({ token, username: administration.username, role, _id: administration._id, category });

  } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/Raports', async (req, res) => {
  try {
    const newRaport = new Registration(req.body);
    await newRaport.save();
    res.status(201).json(newRaport);
  } catch (error) {
    console.error("Error saving report:", error);
    res.status(500).json({ error: 'Server Error' });
  }
});

app.get('/api/AllRaports', async (req, res) => {
  try {
    const raports = await Registration.find();
    res.status(200).json(raports);
  } catch (error) {
    console.error("Error fetching reports:", error);
    res.status(500).json({ error: 'Server Error' });
  }
});

app.put('/api/Raports/:id', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
 
    const updatedReport = await Registration.findByIdAndUpdate(
      id,
      { status }, 
      { new: true } 
    );

    if (!updatedReport) {
      return res.status(404).json({ error: 'Report not found' });
    }

    res.status(200).json(updatedReport);
  } catch (error) {
    console.error('Error update status:', error);
    res.status(500).json({ error: 'Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
