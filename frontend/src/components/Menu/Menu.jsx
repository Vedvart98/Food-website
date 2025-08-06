import React, { useContext, useState } from 'react'
import styles from './Menu.module.css'
import { createSearchParams, Link, useNavigate } from 'react-router-dom'
import { StoreContext } from '../../Context/StoreContext';
const Menu = () => {
  const [location, setLocation] = useState('');
  const [searchRestaurant, setSearchRestaurant] = useState('');
  const { restaurants } = useContext(StoreContext);
  const navigate = useNavigate();
  const goToResults = ()=>{
    const params = new URLSearchParams();
    if (location.trim()) params.set('location', location.trim());
    if (searchRestaurant.trim()) params.append('restoName', searchRestaurant.trim());
    navigate(`/results?${params.toString()}`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    goToResults();
  }
const searchDown = (e)=>{
  if(e.key === 'Enter'){
    e.preventDefault();
    goToResults();
  }
}

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
              <input type="text" placeholder='Enter location' value={location} onChange={(e) => setLocation(e.target.value)} onKeyDown={searchDown} />
              <input type="text" placeholder='Search for restaurants' value={searchRestaurant} onChange={(e) => setSearchRestaurant(e.target.value)} />
            </div>
            <div style={{ width: '200px' }}>
              <button className='btn'>&#8594;</button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
};

export default Menu