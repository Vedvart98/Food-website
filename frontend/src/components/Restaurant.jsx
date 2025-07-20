// \/
import React from 'react';
// require('dotenv').config();
import styled from 'styled-components';
const API_URL = import.meta.env.REACT_APP_API_URL;

function Restaurant({ name, imageUrl, description, review, location }) {
  return (
    <RestaurantContainer>
      <div className="resto-card">
        <div className='essential'>
          <img src={`${API_URL}${imageUrl}`} alt={name} className='icon' />
          <div className='resto-text'>
            <h4>{name}</h4>
            <p className='desc'>Description: {description}</p>
            <p>Review: {review}&#9733;</p>
            <p>Location: {location}</p>
          </div>
        </div>
      </div>
    </RestaurantContainer>
  )
}

export default Restaurant
const RestaurantContainer = styled.div`
.resto-card{
// 
background: #fff;
  border-radius: 10px;
  padding: 1rem;
  box-shadow: 0 4px 10px rgba(0 0 0 / 0.05);
  max-width: 320px;
}
 
.resto-card .essential .icon{
     flex-shrink: 0;
    width: 100%;
    height: 120px;
    object-fit: cover;
    border-radius: 8px;
  }
.essential{
    display:flex;
    flex-direction:column;
    align-items:center;
    gap:1rem;
  }
.resto-text{
    display:flex;
    flex-direction:column;
    gap:0.25rem;
    font-size:0.9rem;
    color:black;
   }
.resto-text p {
  display: -webkit-box;
  -webkit-line-clamp: 2;   /* Limit to 2 lines */
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
    @media (max-width: 600px) {
    .essential {
      flex-direction: column;
      align-items: center;
      text-align: center;
    }
    .icon {
      width: 100%;
      height: 160px;
    }
  }
`;