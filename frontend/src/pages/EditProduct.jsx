import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getProduct, updateProduct } from '../services/productService';

function EditProduct() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    async function loadProduct() {
      setError('');
      try {
        const result = await getProduct(id);
        setProduct(result);
      } catch (err) {
        setError(err.message);
      }
    }
    loadProduct();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await updateProduct(id, {
        name: product.name,
        category: product.category,
        quantity: Number(product.quantity),
        price: Number(product.price),
        description: product.description,
      });
      navigate('/inventory');
    } catch (err) {
      setError(err.message);
    }
  };

  if (!product) {
    return <div className="card">Loading product data...</div>;
  }

  return (
    <div className="card">
      <h2 className="page-title">Edit Product</h2>
      {error && <div className="message">{error}</div>}
      <form onSubmit={handleSubmit}>
        <label>
          Product name
          <input
            value={product.name}
            onChange={(e) => setProduct({ ...product, name: e.target.value })}
            required
          />
        </label>
        <label>
          Category
          <input
            value={product.category || ''}
            onChange={(e) => setProduct({ ...product, category: e.target.value })}
          />
        </label>
        <label>
          Quantity
          <input
            type="number"
            min="0"
            value={product.quantity}
            onChange={(e) => setProduct({ ...product, quantity: e.target.value })}
            required
          />
        </label>
        <label>
          Price
          <input
            type="number"
            min="0"
            step="0.01"
            value={product.price}
            onChange={(e) => setProduct({ ...product, price: e.target.value })}
            required
          />
        </label>
        <label>
          Description
          <textarea
            value={product.description || ''}
            onChange={(e) => setProduct({ ...product, description: e.target.value })}
            rows="4"
          />
        </label>
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
}

export default EditProduct;
