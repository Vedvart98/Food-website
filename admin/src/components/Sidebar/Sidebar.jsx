import React from 'react'
import { Link } from 'react-router-dom'
import './Sidebar.css'
const Sidebar = () => {
  return (
    <div className="sidebar-container">
      <p>Sidebar</p>
      <div className="sidebar">
        <ul style={{ listStyleType: 'none' }}>
          <Link to='/'>
            <li>Dashboard</li></Link>
          <Link to='/add'>
            <li>Add Items</li>
          </Link>
          <Link to='/order'>
            <li>Order status</li>
          </Link>
          <Link to='/listDishes'>
            <li>List of Dishes</li>
          </Link>
          <Link to='/addRestaurant'>
            <li>Add Restaurant</li>
          </Link>
          <Link to='/listRestaurants'>
            <li>list of Restaurants</li>
          </Link>
        </ul>
      </div>
    </div>

  )
}

export default Sidebar