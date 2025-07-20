// \/
import { useContext, useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import axios from "axios";
import React from 'react';
import styles from './LocationList.module.css'
import Restaurant from "../Restaurant";
const LocationList = () => {
  const [hotels, setHotels] = useState([]);
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const location = searchParams.get('location') ?? '';
  const hotelName = searchParams.get('hotelName') ?? '';


  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const res = await axios.get('/api/hotels', {
          params: { location, hotelName },
        });
        console.log("axios data =", res.data);
        setHotels(res.data);
      } catch (err) {
        console.log('Failed to fetch hotels: ', err);
      } finally {
        setLoading(false);
      }
    };
    fetchHotels();
  }, [location, hotelName]);
  if (loading) return <p>Loading Hotels...</p>
  // if(error) return <p style={{color:"red"}}>{error}</p>

  if (!Array.isArray(hotels)) {
    console.log("Expected array,got: ", hotels);
    return <p>Invalid data recieved</p>
  }
  if (hotels.length === 0) return <p>No matching hotels found</p>
  return (
    <div className={styles.hotels}>
      <h3>Showing results for "{hotelName}" in "{location}"</h3>
      <div className={styles.hotelList}>
        {hotels.map((h) => (
          <div key={h._id} className={styles.hotelCard}>
            <Restaurant name={h.hotelName} imageUrl={h.imageUrl} description={h.description} review={h.review} location={h.location} />
            <div style={{ width: '100px' }}>
              <Link to='/dishes' state={{ hotelName: h.hotelName }}><button className="btn">Open</button></Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

};

export default LocationList;