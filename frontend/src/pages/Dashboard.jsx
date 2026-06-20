import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { getProducts } from '../services/productService';

function Dashboard() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadData() {
      setError('');
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      }
    }

    loadData();
  }, []);

  const totalProducts = products.length;
  const totalQuantity = products.reduce((sum, product) => sum + Number(product.quantity), 0);
  const totalValue = products.reduce((sum, product) => sum + Number(product.quantity) * Number(product.price), 0);

  const categorySummary = useMemo(() => {
    const summary = {};
    products.forEach((product) => {
      const category = product.category || 'Uncategorized';
      summary[category] = (summary[category] || 0) + 1;
    });
    return summary;
  }, [products]);

  const lowStock = products.filter((product) => Number(product.quantity) <= 5);

  return (
    <div className="card">
      <div className="page-header">
        <div>
          <h2 className="page-title">Inventory Dashboard</h2>
          <p>View stock levels, total value, and category breakdown for your products.</p>
        </div>
        <Link to="/add-product">
          <button>Add New Product</button>
        </Link>
      </div>

      {error && <div className="message">{error}</div>}

      <div className="summary-grid">
        <div className="summary-card">
          <strong>{totalProducts}</strong>
          <span>Products in inventory</span>
        </div>
        <div className="summary-card">
          <strong>{totalQuantity}</strong>
          <span>Total quantity</span>
        </div>
        <div className="summary-card">
          <strong>${totalValue.toFixed(2)}</strong>
          <span>Total stock value</span>
        </div>
        <div className="summary-card">
          <strong>{lowStock.length}</strong>
          <span>Low stock items</span>
        </div>
      </div>

      <div className="card" style={{ marginTop: '24px' }}>
        <h3>Category Summary</h3>
        <div className="summary-grid">
          {Object.entries(categorySummary).map(([category, count]) => (
            <div key={category} className="summary-card">
              <strong>{count}</strong>
              <span>{category}</span>
            </div>
          ))}
          {products.length === 0 && <p>No products to summarize yet.</p>}
        </div>
      </div>

      <div className="card" style={{ marginTop: '24px' }}>
        <h3>Low Stock Alerts</h3>
        {lowStock.length === 0 ? (
          <p>All products have sufficient stock levels.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Category</th>
                <th>Quantity</th>
              </tr>
            </thead>
            <tbody>
              {lowStock.map((product) => (
                <tr key={product.id} className="low-stock">
                  <td>{product.name}</td>
                  <td>{product.category || 'Uncategorized'}</td>
                  <td>{product.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
