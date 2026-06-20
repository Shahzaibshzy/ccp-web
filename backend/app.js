const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');
const { initializeDatabase } = require('./database');

const app = express();

app.use(cors());
app.use(express.json());

initializeDatabase();

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

app.get('/api', (req, res) => {
  res.send({ message: 'Inventory API is running' });
});

app.get('/', (req, res) => {
  res.send({ message: 'Inventory API is running' });
});

module.exports = app;
