// \/
import { useContext, useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import axios from "axios";
import styles from './LocationList.module.css'
import Restaurant from "../Restaurant";
const LocationList = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const location = searchParams.get('location') ?? '';
  const restoName = searchParams.get('restoName') ?? '';


  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const res = await axios.get('/api/restaurants/search', {
          params: { location, restoName },
        });
        console.log("axios data =", res.data);
        setRestaurants(res.data);
      } catch (err) {
        console.log('Failed to fetch restaurants: ', err);
      } finally {
        setLoading(false);
      }
    };
    fetchRestaurants();
  }, [location, restoName]);
  if (loading) return <p>Loading restaurants...</p>

  if (!Array.isArray(restaurants)) {
    console.log("Expected array,got: ", restaurants);
    return <p>Invalid data recieved</p>
  }
  if (restaurants.length === 0) return <p>No matching restaurants found</p>
  return (
    <div className={styles.restaurants}>
      <h3>Showing results for "{restoName}" in "{location}"</h3>
      <div className={styles.restoList}>
        {restaurants.map((h) => (
          <div key={h._id} className={styles.restoCard}>
            <Restaurant name={h.restoName} imageUrl={h.imageUrl} description={h.description} review={h.review} location={h.location} />
            <div style={{ width: '100px' }}>
              <Link to='/dishes' state={{ restoName: h.restoName }}><button className="btn">Open</button></Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

};

export default LocationList;