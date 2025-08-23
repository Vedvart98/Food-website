import React, { useState } from 'react'
import styled from "styled-components"
import { Link, useNavigate, createSearchParams } from 'react-router-dom';
import { useAuth } from '../Context/authContext';
import { assets } from '../assets/assets';

const Navbar = ({ setShowLogin }) => {
  const { user, isAuthenticated, logout } = useAuth();
  const [locationText, setLocationText] = useState('');
  const [searchText, setSearchText] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const navigate = useNavigate();

  const searchLocation = (e) => {
    if (e.key === 'Enter' && locationText.trim()) {
      navigate({
        pathname: '/',
        search: createSearchParams({ query: locationText.trim() }).toString(),
      });
      setLocationText('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && searchText.trim()) {
      navigate({
        pathname: '/search',
        search: createSearchParams({ query: searchText.trim() }).toString(),
      });
      setSearchText('');
    }
  };

  const handleUserImageClick = () => setShowDropdown(prev => !prev);

  const handleLogout = async () => {
    await logout();
    setShowDropdown(false);
    navigate('/login');
  };

  return (
    <NavbarContainer>
      <div className="navbar">
        <div className="logo">
          <Link to='/'><img src={assets.logo} alt="logo" /></Link>
        </div>

        <div className="search-location">
          <input
            type="text"
            placeholder='Enter your location'
            value={locationText}
            onChange={(e) => setLocationText(e.target.value)}
            onKeyDown={searchLocation}
            className="location-input"
          />
          <input
            type="text"
            placeholder='Search dishes/restaurants'
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onKeyDown={handleKeyDown}
            className="search-input"
          />
        </div>

        <div className="actions">
          <Link to='/'>Home</Link>
          <Link to='/cart'>
            <img src="https://cdn-icons-png.freepik.com/256/11689/11689764.png" alt="Cart" className="cart-icon" />
          </Link>

          {isAuthenticated ? (
            <div className="user">
              <img
                src={user.image || '/images/user.png'}
                alt="User"
                className="user-avatar"
                onClick={handleUserImageClick}
              />
              {showDropdown && (
                <div className="dropdown">
                  <Link to='/profile' onClick={() => setShowDropdown(false)}>Profile</Link>
                  <Link to='/OrderTrack' onClick={() => setShowDropdown(false)}>Track Order</Link>
                  <button onClick={handleLogout}>Logout</button>
                </div>
              )}
            </div>
          ) : (
            <Link to='/login'>
              <button className="sign-in-btn" onClick={() => setShowLogin(true)}>Sign In</button>
            </Link>
          )}
        </div>

        <div className="mobile-menu-btn" onClick={() => setShowMobileMenu(!showMobileMenu)}>
          ☰
        </div>
      </div>

      {showMobileMenu && (
        <div className="mobile-menu">
          <Link to='/' onClick={() => setShowMobileMenu(false)}>Home</Link>
          <Link to='/cart' onClick={() => setShowMobileMenu(false)}>Cart</Link>
          {isAuthenticated ? (
            <>
              <Link to='/profile' onClick={() => setShowMobileMenu(false)}>Profile</Link>
              <Link to='/OrderTrack' onClick={() => setShowMobileMenu(false)}>Track Order</Link>
              <button onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <button onClick={() => { setShowLogin(true); setShowMobileMenu(false); }}>Sign In</button>
          )}
        </div>
      )}
    </NavbarContainer>
  )
}

export default Navbar

const NavbarContainer = styled.nav`
  background: #ffffff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
  position: sticky;
  top: 0;
  z-index: 999;

  .navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.6rem 1rem;
    max-width: 1200px;
    margin: auto;
  }

  .logo img {
    height: 40px;
    cursor: pointer;
  }

  .search-location {
    display: flex;
    gap: 0.5rem;
    flex: 1;
    max-width: 600px;
    margin: 0 1rem;
  }

  .location-input, .search-input {
    flex: 1;
    padding: 0.5rem 0.75rem;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-size: 0.95rem;
    outline: none;
    transition: box-shadow 0.2s;
  }

  .location-input:focus, .search-input:focus {
    box-shadow: 0 0 0 2px #ff7043a6;
  }

  .actions {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .cart-icon {
    height: 28px;
    cursor: pointer;
  }

  .sign-in-btn {
    background: #ff7043;
    color: white;
    padding: 0.4rem 0.9rem;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-weight: 500;
    transition: background 0.3s ease;
  }

  .sign-in-btn:hover {
    background: #ff5722;
  }

  .user {
    position: relative;
  }

  .user-avatar {
    height: 35px;
    width: 35px;
    cursor: pointer;
  }

  .dropdown {
    position: absolute;
    right: 0;
    top: 120%;
    min-width:120px;
    background: #fff;
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    border-radius: 6px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    animation: fadeIn 0.3s ease-in-out;
  }

  .dropdown a, .dropdown button {
    padding: 0.6rem;
    text-align: left;
    text-decoration: none;
    color: #333;
    background: none;
    border: none;
    cursor: pointer;
    font-size: 0.95rem;
  }

  .dropdown a:hover, .dropdown button:hover {
    background: #f2f2f2;
  }

  .mobile-menu-btn {
    display: none;
    font-size: 1.5rem;
    cursor: pointer;
  }

  .mobile-menu {
    display: none;
  }

  @media (max-width: 768px) {
    .search-location {
      display: none;
    }
    .actions {
      display: none;
    }
    .mobile-menu-btn {
      display: block;
    }
    .mobile-menu {
      display: flex;
      flex-direction: column;
      background: #fff;
      box-shadow: 0 2px 8px rgba(0,0,0,0.15);
      padding: 1rem;
      gap: 0.75rem;
    }
    .mobile-menu a, .mobile-menu button {
      color: #333;
      text-decoration: none;
      border: none;
      background: none;
      font-size: 1rem;
      text-align: left;
      cursor: pointer;
    }
  }

  @keyframes fadeIn {
    from {opacity: 0; transform: translateY(-10px);}
    to {opacity: 1; transform: translateY(0);}
  }
`;
