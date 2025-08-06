// \/
import React, { useContext, useRef, useState } from 'react'
import { Link } from 'react-router-dom';
import styled from "styled-components";
import DishCard from '../Pages/DishCard';
import { StoreContext } from '../Context/StoreContext';
import { useEffect } from 'react';
function Types() {
  const selectedDish = "4"; //read the reviews
  const [button, setButton] = useState(false);
  const scrollRef = useRef(null);
  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behaviour: "smooth"
      });
    }
  };
  const { dishes, addToCart } = useContext(StoreContext);
  const filteredDishes = dishes.filter(
    (dish) => dish.review >= selectedDish
  );
  useEffect(() => {
    setButton(filteredDishes.length > 4);
  }, [filteredDishes]);

  return (
    <TypesContainer>
      <h3>Some of our bests</h3>
      <div className="bests">
        {button &&
          <button className="left-btn" onClick={() => scroll('left')}>&#8592;</button>
        }
        <div className="khana" ref={scrollRef}>
          {filteredDishes.map((dish, _id) => (
            <div className='kha' key={_id}>
              <>
                <Link to={`/dish/${dish._id}`} key={_id} style={{ textDecoration: 'none' }}>
                  <DishCard key={_id} name={dish.name} imageUrl={dish.imageUrl} price={dish.price} />
                </Link>
                <div>
                  <button className='btn' onClick={() => addToCart(dish._id)}>Add To Cart</button>
                </div>
              </>
            </div>
          ))}
        </div>
        {
          button &&
          <button className="right-btn" onClick={() => scroll('right')}>&#8594;</button>
        }
      </div>
    </TypesContainer>
  )
}
export default Types;
const TypesContainer = styled.div`
 width:100%;
 margin:40px 0;

h3{
text-align:center;
}
.bests{
  display:flex;
  gap:0.5rem;
    align-items: center;
    position:relative;
}
 .khana{
    display:flex;
    gap:1rem;
    max-width:90vw;
    overflow-x: auto;
    scroll-behavior: smooth;
    padding:1rem;
    background-color:rgb(255, 254, 254);
 }
    .kha{
      display:flex;
      flex-direction:column;
      align-items:center;
      background:#fff;
      gap:0.5rem;
      border-radius: 10px;
      padding:10px;
      min-width: 220px;
      box-shadow: 0 4px 10px rgba(0 0 0 / 0.05);
    }
  .left-btn, .right-btn {
    font-size: 2rem;
    padding: 10px 20px;
    border: none;
    background-color: #fff;
    cursor: pointer;
    box-shadow: 0 0 5px rgba(0,0,0,0.1);
    z-index: 0;
  }

  .left-btn:hover, .right-btn:hover {
    background-color: #eee;
  }
     @media (max-width: 600px) {
    .left-btn,
    .right-btn {
      display: none;
    }
    .kha {
      min-width: 180px;
    }
  }
`;
