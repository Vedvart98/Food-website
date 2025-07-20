import React, { useContext, useState } from 'react'
import styles from './Menu.module.css'
import { createSearchParams, Link, useNavigate } from 'react-router-dom'
import { StoreContext } from '../../Context/StoreContext';
const Menu = () => {
  const [location, setLocation] = useState('');
  const [searchHotel, setSearchHotel] = useState('');
  const { hotels } = useContext(StoreContext);
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (location.trim()) params.append('location', location.trim());
    if (searchHotel.trim()) params.append('hotelName', searchHotel.trim());
    navigate(`/results?${params.toString()}`);
  };
  return (
    <div className={styles.MenuContainer}>

      <form onSubmit={handleSubmit} action="">
        <div>
          <div className={styles.locationSearch}>
            <div className={styles.menu}>
              <h2>Find the Best Food Near You!</h2>
              <p>Find the best restaurants and dishes in your area. Enter your location and start exploring.</p>
            </div>
            <div className={styles.input}>
              <input type="text" placeholder='Enter location' value={location} onChange={(e) => setLocation(e.target.value)} required />
              <input type="text" placeholder='Search for restaurants' value={searchHotel} onChange={(e) => setSearchHotel(e.target.value)} required />
            </div>
            <div style={{ width: '200px' }}>
              <button className='btn'>&#8594;</button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Menu