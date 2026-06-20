import { Link, useNavigate } from 'react-router-dom';
import { clearToken, getToken, getUser } from '../services/auth';

function Nav() {
  const navigate = useNavigate();
  const authToken = getToken();
  const user = getUser();

  const onLogout = () => {
    clearToken();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/inventory">Inventory</Link>
        {authToken && <Link to="/add-product">Add Product</Link>}
      </div>

      <div className="nav-links">
        {authToken ? (
          <>
            <span className="nav-greeting">Hello, {user?.username || 'User'}</span>
            <button onClick={onLogout} className="secondary">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Nav;
