// \/
import React, { useContext } from 'react'
import { useLocation } from 'react-router-dom'
import styled from 'styled-components'
import { StoreContext } from '../Context/StoreContext'
const API_URL = import.meta.env.REACT_APP_API_URL;

const Dishes = () => {
  const location = useLocation();
  const selectedHotelName = location.state?.hotelName;  //read passed hotel name
  const { dishes, addToCart, hotels } = useContext(StoreContext)

  const filteredDishes = dishes.filter(
    (dish) => dish.hotelName === selectedHotelName
  );
  const filteredHotel = hotels.filter(
    (hotel) => hotel.hotelName === selectedHotelName
  );
  // const hotel = hotels.find((h)=> h.hotelName === selectedHotelName);
  return (
    <DishContainer>
      <>
        <div className='dish-container'>
          <h2>Dishes from {selectedHotelName}</h2>
          <div className="header">
            <p>Dish Image</p>
            <p>Dish Name</p>
            <p>Price</p>
            <p>Add</p>
          </div>
          <hr />

          {filteredDishes.length === 0 ? (
            <p>No Dishes for this hotel name</p>
          )
            :
            (
              filteredDishes.map((dish) => {
                return (
                  <div className='dishes-item' key={dish._id}>
                    <img src={`${API_URL}${dish.imageUrl}`} alt={dish.name} />
                    <p>{dish.name}</p>
                    <p>${dish.price}</p>
                    <button className='btn' onClick={() => addToCart(dish._id)}>Add</button>
                  </div>
                )
              }))
          }
        </div>
      </>
    </DishContainer>
  )
}

export default Dishes
const DishContainer = styled.div`
// margin-top:100px;
.header{
display:flex;
justify-content:space-around;
}
.dishes-item{
display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
align-items:center;
gap:10px;
text-align:center;
  }
.dishes-item img{
  height:150px;
  width:150px;
  object-fit:cover;
}
.dish-container{
display:flex;
flex-direction:column;
gap:20px;
}
`;