import React, { useContext } from 'react'
import { StoreContext } from '../../Context/StoreContext'
import { useParams } from 'react-router-dom';
const API_URL = import.meta.env.REACT_APP_API_URL;
const DishType = () => {
  const { dishes, addToCart } = useContext(StoreContext);
  const { dishId } = useParams();
  const dish = dishes.find((d) => d._id === dishId);
  if (!dish) {
    return <p>Dish not found</p>
  }
  return (
    <div>
      <div key={dish._id}>
        <img src={`${API_URL}${dish.imageUrl}`} />
        <p>Dish name: {dish.name}</p>
        <p>Dish price: {dish.price}</p>
        <button className='btn' onClick={() => addToCart(dish._id)}>Add to cart</button>
      </div>


    </div>
  )
}

export default DishType