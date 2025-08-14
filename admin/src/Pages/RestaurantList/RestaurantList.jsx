import axios from 'axios';
import React from 'react'
import './RestaurantList.css'
import { useEffect } from 'react';
import { useState } from 'react'
import { Link } from 'react-router-dom';
const RestoList = () => {
    const [restaurants, setRestaurants] = useState([]);
    const [loading, setLoading] = useState(true);
    const fetchRestaurants = async () => {
        try {
            const res = await axios.get(`http://localhost:5000/api/restaurants`);
            setRestaurants(res.data);
            console.log(res.data);
        } catch (error) {
            console.error('Something went wrong while fetching restaurants');
        }
    }
    useEffect(() => {
        fetchRestaurants();
        setLoading(false);
    }, []);
    const handleDelete = async (id) => {
        axios.delete(`http://localhost:5000/api/restaurants/${id}`).then(() => {
            setRestaurants(restaurants.filter(restaurant => restaurant._id !== id));
        });
    }
    if (loading) return <p>Loading restaurants...</p>
    return (
        <div className='resto-container'>
            <h2>List of Restaurants</h2>
            <ul className="lists">
                {Array.isArray(restaurants) && restaurants.length > 0 ? (
                    restaurants.map(restaurant => (
                        <li key={restaurant._id} className='resto-card'>
                            <img src={`http://localhost:5000${restaurant.imageUrl}`} alt="Restaurant" className='icon' />
                            <div className="restoDetails">
                                <p><strong>{restaurant.restoName}</strong></p>
                                <p>Description: {restaurant.description}</p>
                                <p>Location: {restaurant.location}</p>
                            </div>
                            <div className="buttons">
                                <div>
                                    <button className="btn" onClick={() => handleDelete(restaurant._id)}>Delete</button>
                                </div>
                                <div>
                                    <Link to={`/editRestaurant/${restaurant._id}`}><button className='btn'>Edit</button></Link>
                                </div>
                            </div>
                        </li>
                    ))
                ) : (
                    <li>No Restaurants found</li>
                )}
            </ul>
        </div>
    )
}

export default RestoList