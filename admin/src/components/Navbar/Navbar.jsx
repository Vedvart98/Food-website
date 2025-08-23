import React from 'react'
import './Navbar.css'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useEffect } from 'react'
import { assets } from '../../assets/assets'
const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  useEffect(() => {
    const currentUser = getCurrentUser();
    setUser(currentUser);
  }, []);
  const logout = async () => {
    try {
      const token = getToken();
      await fetch(`http://localhost:5000/api/auth/logout`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setUser(null);
      setShowDropdown(false);
      window.location.href = `http://localhost:5173/login`;
    } catch (error) {
      console.log('Logout error:', error);
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  }
  const getCurrentUser = () => {
    try {
      const user = localStorage.getItem('user');
      return user ? JSON.parse(user) : null;
    } catch (error) {
      return null;
    }
  }
  const getToken = () => {
    return localStorage.getItem('token');
  }
  const isAuthenticated = () => {
    const token = getToken();
    const user = getCurrentUser();
    return !!(token && user);
  }
  const handleUserImageClick = () => {
    setShowDropdown((prev) => !prev);
  }
  return (
    <nav>
      <div className="navbar">
        <img src="https://cdn-icons-png.freepik.com/256/10855/10855274.png?ga=GA1.1.1249373621.1745418540&semt=ais_hybrid" alt="" height={40} width={40} />
        <div style={{ position: 'relative', display: 'inline-block' }}>
          <img src={assets.user || 'profile'} alt="photo" height={40} width={40} style={{ cursor: 'pointer' }} onClick={handleUserImageClick} />

          {showDropdown && (
            <div style={{
              position: 'absolute',
              right: '0',
              top: '110%',
              background: '#fff',
              boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
              borderRadius: '6px',
              zIndex: 100,
              minWidth: '120px',
              padding: '0.5rem 0'
            }}>
              <button style={{
                display: 'block', width: '100%', background: 'none', border: 'none', padding: '0.5rem 1rem',
                textAlign: 'left', cursor: 'pointer', color: '#e74c3c'
              }} onClick={logout}>Logout</button>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}
export default Navbar