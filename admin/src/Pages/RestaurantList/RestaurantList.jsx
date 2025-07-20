import axios from 'axios';
import React from 'react'
import './RestaurantList.css'
import { useEffect } from 'react';
import { useState } from 'react'
const RestoList = () => {
    const [hotels, setHotels] = useState([]);
    const [loading, setLoading] = useState(true);
    const fetchHotels = async () => {
        try {
            const res = await axios.get(`${API_URL}/api/hotels`);
            setHotels(res.data);
            console.log(res.data);
        } catch (error) {
            console.error('Something went wrong while fetching hotels');
        }
    }
    useEffect(() => {
        fetchHotels();
        setLoading(false);
    }, []);
    const handleDelete = async (id) => {
        axios.delete(`${API_URL}/api/hotels/${id}`).then(() => {
            setHotels(hotels.filter(hotel => hotel._id !== id));
        });
    }
    if (loading) return <p>Loading restaurants...</p>
    return (
        <div className='resto-container'>
            <h2>List of Restaurants</h2>
            <ul className="lists">
                {Array.isArray(hotels) && hotels.length > 0 ? (
                    hotels.map(hotel => (
                        <li key={hotel._id} className='resto-card'>
                            <div>
                                <img src={`${API_URL}${hotel.imageUrl}`} alt="Restaurant" className='icon' />
                            </div>
                            <div className="restoDetails">
                                <p><strong>{hotel.hotelName}</strong></p>
                                <p>Description: {hotel.description}</p>
                                <p>Location: {hotel.location}</p>
                            </div>
                            <div className="buttons">
                                <button className="btn" onClick={() => handleDelete(hotel._id)}>Delete</button>
                                <button className='btn'>Edit</button>
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