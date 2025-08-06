// \/
import React, { useContext } from 'react'
import { Link, useLocation } from 'react-router-dom'
import styled from 'styled-components'
import { StoreContext } from '../Context/StoreContext'
// const API_URL = import.meta.env.REACT_APP_API_URL;

const Dishes = () => {
  const location = useLocation();
  const selectedRestaurantName = location.state?.restoName;  //read passed restaurant name
  const { dishes, addToCart, restaurants } = useContext(StoreContext)

  const filteredDishes = dishes.filter(
    (dish) => dish.restoName === selectedRestaurantName
  );
  const filteredRestaurant = restaurants.filter(
    (restaurant) => restaurant.restoName === selectedRestaurantName
  );
  return (
    <DishContainer>
      <>
        <div className='dish-container'>
          <h2>Dishes from {selectedRestaurantName}</h2>
          <div className="dishes">
            {filteredDishes.length === 0 ? (
              <p>No Dishes for this restaurant name</p>
            )
              :
              (
                filteredDishes.map((dish) => {
                  return (
                    <Link to={`/dish/${dish._id}`} key={dish._id} style={{textDecoration:'none'}}>
                    <div className='dishes-item' key={dish._id}>
                      <img src={`http://localhost:5000${dish.imageUrl}`} alt={dish.name} />
                      <p>{dish.name}</p>
                      <p>${dish.price}</p>
                      <div>
                        <button className='btn' onClick={() => addToCart(dish._id)}>Add</button>
                      </div>
                    </div>
                    </Link>
                  )
                }))
            }
          </div>

        </div>
      </>
    </DishContainer>
  )
}

export default Dishes
const DishContainer = styled.div`
.header{
// display:flex;
// justify-content:space-between;
}
.dishes{
  display:grid;
  grid-template-columns:repeat(auto-fill,minmax(300px,1fr));
  gap:1.5rem;
  }
  .dishes-item{
  background:#fff;
  color:black;
  border:1px solid #ddd;
  border-radius:10px;
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    box-shadow:0 4px 12px rgba(0,0,0,0.06);
  height:400px;
  width:300px;
  gap:1rem;
  }
.dishes-item img{
  height:50%;
  width:90%;
  object-fit:cover;
}
.dish-container{
display:flex;
flex-direction:column;
gap:20px;
}
`;