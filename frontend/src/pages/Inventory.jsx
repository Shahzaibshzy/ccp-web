import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { getProducts, deleteProduct } from '../services/productService';

function Inventory() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');

  const loadProducts = async () => {
    setError('');
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const categories = useMemo(() => {
    return [...new Set(products.map((product) => product.category || 'Uncategorized'))];
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const lowerSearch = search.toLowerCase().trim();
      const matchesSearch =
        product.name.toLowerCase().includes(lowerSearch) ||
        (product.description || '').toLowerCase().includes(lowerSearch);
      const matchesCategory = category === '' || (product.category || 'Uncategorized') === category;
      return matchesSearch && matchesCategory;
    });
  }, [products, search, category]);

  const totalQuantity = products.reduce((sum, product) => sum + Number(product.quantity), 0);
  const totalValue = products.reduce((sum, product) => sum + Number(product.quantity) * Number(product.price), 0);
  const lowStockCount = products.filter((product) => Number(product.quantity) <= 5).length;

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this product?')) {
      return;
    }

    try {
      await deleteProduct(id);
      setProducts((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="card">
      <div className="page-header">
        <div>
          <h2 className="page-title">Inventory Management</h2>
          <p>Track products, quantities, prices, and stock status in one place.</p>
        </div>
        <div className="button-row">
          <Link to="/add-product">
            <button>Add Product</button>
          </Link>
          <button className="secondary" onClick={loadProducts}>
            Refresh
          </button>
        </div>
      </div>

      <div className="summary-grid">
        <div className="summary-card">
          <strong>{products.length}</strong>
          <span>Total products</span>
        </div>
        <div className="summary-card">
          <strong>{totalQuantity}</strong>
          <span>Total stock quantity</span>
        </div>
        <div className="summary-card">
          <strong>${totalValue.toFixed(2)}</strong>
          <span>Total inventory value</span>
        </div>
        <div className="summary-card">
          <strong>{lowStockCount}</strong>
          <span>Low stock items</span>
        </div>
      </div>

      <div className="filter-row">
        <input
          type="search"
          placeholder="Search by name or description"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">All categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {error && <div className="message">{error}</div>}
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.length === 0 ? (
            <tr>
              <td colSpan="6">No matching products found.</td>
            </tr>
          ) : (
            filteredProducts.map((product) => (
              <tr key={product.id} className={Number(product.quantity) <= 5 ? 'low-stock' : ''}>
                <td>{product.name}</td>
                <td>{product.category || 'Uncategorized'}</td>
                <td>{product.quantity}</td>
                <td>${Number(product.price).toFixed(2)}</td>
                <td>{product.description || '—'}</td>
                <td className="actions">
                  <Link to={`/edit-product/${product.id}`}>
                    <button>Edit</button>
                  </Link>
                  <button className="secondary" onClick={() => handleDelete(product.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Inventory;
