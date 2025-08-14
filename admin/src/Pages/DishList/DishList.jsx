import React, { useEffect } from 'react'
import axios from 'axios'
import './DishList.css'
import { Link } from 'react-router-dom'
import { useState } from 'react'
const DishList = () => {
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAllDishes = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/dishes`);
      setDishes(res.data);
      console.log(res.data);
    } catch (err) {
      console.error('Something went wrong while fetching dishes', err);
    }
  }
  useEffect(() => {
    fetchAllDishes();
    setLoading(false);
  }, []);
  const handleDelete = async (id) => {
    axios.delete(`http://localhost:5000/api/dishes/${id}`).then(() => {
      setDishes(dishes.filter(dish => dish._id !== id));
    });
  };
  if (loading) return <p>Loading Dishes...</p>
  return (
    <div className='list-container'>
      <h2>All Dishes</h2>
      <ul className='lists'>
        {Array.isArray(dishes) && dishes.length > 0 ? (
          dishes.map(dish => (
            <li key={dish._id} className='dish-card'>
              <div>
                <img src={`http://localhost:5000${dish.imageUrl}`} alt="dish" className='icon' />
              </div>
              <div className='dish-details'>
                <p>{dish.name} - ${dish.price}/unit</p>
                <p>{dish.restoName}</p>
              </div>
              <div className='buttons'>

                <div>
                  <button className='btn' onClick={() => handleDelete(dish._id)}>Delete</button>
                </div>
                <div>
                  <Link to={`/edit/${dish._id}`}><button className='btn'>Edit</button></Link>
                </div>
              </div>
            </li>
          ))
        ) : (
          <li> No dishes found</li>
        )
        }
      </ul>
    </div>
  )
}

export default DishList