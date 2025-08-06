// \/
import axios from 'axios';
import React, { useContext, useEffect, useMemo, useRef, useState } from 'react'
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import Restaurant from './Restaurant';
import styled from 'styled-components';
import { StoreContext } from '../Context/StoreContext';

const normalize = (s = '') =>
  s.normalize('NFKD').replace(/[^\w\s]/g, '').toLowerCase().trim();

function useQuery() {
  return new URLSearchParams(useLocation().search);
}
const Partners = () => {
  const [params] = useSearchParams();
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
  const { restaurants } = useContext(StoreContext);
  const qLocation = params.get('location') || '';
  const qRestoName = params.get('restoName') || '';
  const restaurant = query.toLowerCase();
  // const filteredRestaurants = restaurants.filter(
  //   (h) => h.location.toLowerCase().includes(restaurant)
  // )
  const filteredRestaurants = useMemo(() => {
    return (restaurants || []).filter((r)=>{
      const name = normalize(r.restoName||'');
      const location = normalize(r.location||'');

      const nameMatches = qRestoName ? name.includes(normalize(qRestoName)):true;
      const locMatches = qLocation ? location.includes(normalize(qLocation)):true;
      return nameMatches && locMatches;
    })
  },[restaurants, qRestoName, qLocation]);
  useEffect(() => {
    setShowButton(filteredRestaurants.length > 4);
  }, [filteredRestaurants]);
  if(!Array.isArray(restaurants)) return <p>Loading...</p>
  return (
    <PartnerContainer>
      <h3>Discover best restaurants in your area</h3>

      <div className="restaurants">
        {showButton &&
          <button className="leftButton" onClick={() => scroll('left')}>&#8592;</button>
        }
        <div className="restoList" ref={scrollRef}>
          {
            filteredRestaurants.length > 0 ? (
              filteredRestaurants.map((r, _id) => (
                <div key={_id}>
                  <div className='restoCard' key={_id}>
                    <Link to='/dishes' state={{ restoName: r.restoName }} style={{ textDecoration: 'none' }}>
                      <Restaurant key={_id} name={r.restoName} imageUrl={r.imageUrl} description={r.description} review={r.review} location={r.location} />
                    </Link>
                  </div>
                </div>
              ))
            )
              : (
                <>
                  {showButton && <div>No restaurants in this locality</div>}
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
.restaurants{
display:flex;
align-items:center;
gap:0.5rem;

}
.restoList{
  display:flex;
  gap:1rem;
  max-width:90vw;
  overflow-x:auto;
  scroll-behavior:smooth;
  padding:0.5rem;
  background-color:rgb(255, 255, 255);
  }
  .restoCard{
    display:flex;
    flex-direction:column;
    gap:0.5rem;
    min-width:320px;
    box-shadow:0 4px 12px rgba(0, 0, 0, 0.1);
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
    .restoCard{
      min-width: 260px;
    }
  }
`;