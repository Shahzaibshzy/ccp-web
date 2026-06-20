const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');
const { initializeDatabase } = require('./database');

const app = express();

app.use(cors());
app.use(express.json());

initializeDatabase();

function registerApiRoutes(basePath) {
  app.use(`${basePath}/auth`, authRoutes);
  app.use(`${basePath}/products`, productRoutes);

  app.get(basePath, (req, res) => {
    res.send({ message: 'Inventory API is running' });
  });
}

registerApiRoutes('/api');
registerApiRoutes('/_/backend/api');

app.get('/', (req, res) => {
  res.send({ message: 'Inventory API is running' });
});

module.exports = app;
