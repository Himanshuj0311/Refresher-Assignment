import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/signup">Signup</Link>
      <Link to="/login">Login</Link>
      <Link to="/posts">Posts</Link>
      <button onClick={() => { /* logout logic */ }}>Logout</button>
    </nav>
  );
}

export default Navbar;
