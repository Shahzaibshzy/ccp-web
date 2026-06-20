const express = require('express');
const cors = require('cors');
const authRoutes = require('../backend/routes/auth');
const productRoutes = require('../backend/routes/products');
const { initializeDatabase } = require('../backend/database');

const app = express();

app.use(cors());
app.use(express.json());

// Initialize database once
initializeDatabase();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

app.get('/api', (req, res) => {
  res.send({ message: 'Inventory API is running' });
});

module.exports = app;
