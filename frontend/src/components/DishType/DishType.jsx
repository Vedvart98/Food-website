import React, { useContext } from 'react'
import { StoreContext } from '../../Context/StoreContext'
import { useParams } from 'react-router-dom';
import styles from './DishType.module.css';
const DishType = () => {
  const { dishes, addToCart } = useContext(StoreContext);
  const { dishId } = useParams();
  const dish = dishes.find((d) => d._id === dishId);
  if (!dish) {
    return <p>Dish not found</p>
  }
  return (
    <div className={styles.dishtypecontainer}>
      <div key={dish._id} className={styles.header}>

        <div className={styles.image}>
          <img src={`http://localhost:5000${dish.imageUrl}`} className='icon' />
        </div>
        <div className={styles.details}>
          <p><strong>Dish name:</strong> {dish.name}</p>
          <p><strong>Restaurant name:</strong> {dish.restoName}</p>
          <p><strong>Dish price:</strong> {dish.price}</p>
          <button className='btn' onClick={() => addToCart(dish._id)}>Add to cart</button>
        </div>
      </div>
      <div className={styles.desc}>
        <p><strong>Desciption:</strong> {dish.description}</p>
        <p><strong>Ingredients:</strong> {dish.ingredients}</p>
      </div>
    </div>
  )
}

export default DishType