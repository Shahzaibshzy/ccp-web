const { db } = require('../database');

function getProducts(req, res) {
  const query = 'SELECT * FROM products ORDER BY created_at DESC';
  db.all(query, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ message: 'Failed to load products.' });
    }
    res.json(rows);
  });
}

function getProductById(req, res) {
  const { id } = req.params;
  const query = 'SELECT * FROM products WHERE id = ?';
  db.get(query, [id], (err, product) => {
    if (err) {
      return res.status(500).json({ message: 'Failed to load product.' });
    }
    if (!product) {
      return res.status(404).json({ message: 'Product not found.' });
    }
    res.json(product);
  });
}

function createProduct(req, res) {
  const { name, category, quantity, price, description } = req.body;

  if (!name || quantity == null || price == null) {
    return res.status(400).json({ message: 'Name, quantity, and price are required.' });
  }

  const query = `INSERT INTO products (name, category, quantity, price, description)
    VALUES (?, ?, ?, ?, ?)`;
  db.run(query, [name, category, quantity, price, description], function (err) {
    if (err) {
      return res.status(500).json({ message: 'Failed to create product.' });
    }
    res.status(201).json({ id: this.lastID, name, category, quantity, price, description });
  });
}

function updateProduct(req, res) {
  const { id } = req.params;
  const { name, category, quantity, price, description } = req.body;

  const query = `UPDATE products SET name = ?, category = ?, quantity = ?, price = ?, description = ?
    WHERE id = ?`;
  db.run(query, [name, category, quantity, price, description, id], function (err) {
    if (err) {
      return res.status(500).json({ message: 'Failed to update product.' });
    }
    if (this.changes === 0) {
      return res.status(404).json({ message: 'Product not found.' });
    }
    res.json({ id, name, category, quantity, price, description });
  });
}

function deleteProduct(req, res) {
  const { id } = req.params;
  const query = 'DELETE FROM products WHERE id = ?';
  db.run(query, [id], function (err) {
    if (err) {
      return res.status(500).json({ message: 'Failed to delete product.' });
    }
    if (this.changes === 0) {
      return res.status(404).json({ message: 'Product not found.' });
    }
    res.json({ message: 'Product deleted successfully.' });
  });
}

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
