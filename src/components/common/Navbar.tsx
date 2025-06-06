import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import '../common/styles/Navbar.css'; // Assuming you have a CSS file for styling

const Navbar: React.FC = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/" className="logo">Blog App</Link>
        <div className="nav-links">
          <Link to="/">Home</Link>
          {!user && (
            <>
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
            </>
          )}
          {user && (
            <>
              {user.role === 'WRITER' && (
                <>
                  <Link to="/create-post">Write a Blog</Link>
                  <Link to="/my-posts">My Posts</Link>
                </>
              )}
              {user.role === 'ADMIN' && (
                <Link to="/admin/users">Users</Link>
              )}
              <button onClick={handleLogout}>Logout</button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

// TODO: Students - Enhance the Navbar with the following:
// 1. Add responsive design (e.g., hamburger menu for mobile)
// 2. Add styling for active links using react-router-dom's NavLink
// 3. Add accessibility attributes (e.g., aria-labels)
