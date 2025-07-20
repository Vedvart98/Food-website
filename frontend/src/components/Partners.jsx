// \/
import axios from 'axios';
import React, { useContext, useEffect, useMemo, useRef, useState } from 'react'
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import Restaurant from './Restaurant';
import styled from 'styled-components';
import { StoreContext } from '../Context/StoreContext';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}
const Partners = () => {
  const [showButton, setShowButton] = useState(false);
  const scrollRef = useRef(null);
  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behaviour: 'smooth'
      });
    }
  };

  const query = useQuery().get('query') || '';
  const { hotels } = useContext(StoreContext);
  const hotel = query.toLowerCase();
  const filteredHotels = hotels.filter(
    (h) => h.location.toLowerCase().includes(hotel)
  )
  useEffect(() => {
    setShowButton(filteredHotels.length > 4);
  }, [filteredHotels]);
  return (
    <PartnerContainer>

      <h3>Discover best hotels in your area</h3>

      <div className="hotels">
        {showButton &&
          <button className="leftButton" onClick={() => scroll('left')}>&#8592;</button>
        }
        <div className="hotelList" ref={scrollRef}>
          {
            filteredHotels.length > 0 ? (
              filteredHotels.map((h, _id) => (
                <div key={_id}>
                  <div className='hotelCard' key={_id}>
                    <Link to='/dishes' state={{ hotelName: h.hotelName }} style={{ textDecoration: 'none' }}>
                      <Restaurant key={_id} name={h.hotelName} imageUrl={h.imageUrl} description={h.description} review={h.review} location={h.location} />
                    </Link>
                  </div>
                </div>
              ))
            )
              : (
                <>
                  {showButton && <div>No hotels in this locality</div>}
                </>
              )
          }
        </div>
        {showButton &&
          <button className='rightButton' onClick={() => scroll('right')}>&#8594;</button>
        }
      </div>

    </PartnerContainer>
  )

}

export default Partners;
const PartnerContainer = styled.div`
margin:40px 0;
display:flex;
flex-direction:column;
justify-content:center;
gap:10px;
// align-items:center;
.hotels{
display:flex;
align-items:center;
gap:0.5rem;

}
.hotelList{
  display:flex;
  gap:1rem;
  max-width:90vw;
  overflow-x:auto;
  scroll-behavior:smooth;
  padding:0.5rem;
  background-color:rgb(255, 255, 255);
  }
  .hotelCard{
    display:flex;
    flex-direction:column;
    gap:0.5rem;
    min-width:320px;
  }
  .leftButton,.rightButton{
    font-size:2rem;
    padding:10px 20px;
    border:none;
    background-color:#fff;
    cursor:pointer;
    box-shadow:0 0 5px rgba(0,0,0,0.1);
    z-index:0;
  }
    .leftButton:hover,.rightButton:hover{
    background-color:#eee;
    }  
    
    
    @media (max-width: 600px) {
    .leftButton,.rightButton{
      display: none;
    }
    .hotelCard{
      min-width: 260px;
    }
  }
`;