const express = require('express');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// CORS
app.use(cors({
  origin: 'http://localhost:8080',
  credentials: true
}));

app.use(cookieParser());

// 👇 MUST come before express.json()
const reservationsRoute = require('./routes/reservations');
app.use('/api/reservations/webhook', express.raw({ type: 'application/json' }));

// 👇 Safe to use after webhook
app.use(express.json());

// Routes
app.use('/api/reservations', reservationsRoute);
const authRoutes = require('./routes/auth');
app.use('/api', authRoutes);

// DB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(process.env.PORT, () =>
      console.log(`Server running on port ${process.env.PORT}`)
    );
  })
  .catch(err => console.error(err));
