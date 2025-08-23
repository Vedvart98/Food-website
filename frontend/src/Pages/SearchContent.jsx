import React, { useContext, useMemo, useState } from 'react';
import { StoreContext } from '../Context/StoreContext';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}
const SearchContent = () => {
  // for restaurants/dishes
  const query = useQuery().get('query') || ''; //
  const { dishes, addToCart, restaurants } = useContext(StoreContext);
  const filteredDishes = useMemo(() => {
    const q = query.toLowerCase();
    return dishes.filter(
      (d) =>
        d.name.toLowerCase().includes(q) ||
        d.restoName.toLowerCase().includes(q)
    );

  }, [query, dishes]);


  return (
    <SearchContainer className='search-page'>
      <h2>Results for {query}</h2>
      <div className='Dish'>
        {filteredDishes.length > 0 ? (
          filteredDishes.map((dish, _id) => (
            <div className="searchItem" key={_id}>

              <Link to={`/dish/${dish._id}`} style={{textDecoration:'none'}}>
                <img src={`http://localhost:5000${dish.imageUrl}`} alt={dish.name} />
                <div className='details'>
                  <h3>{dish.name}</h3>
                  <h5>{dish.restoName}</h5>
                  <p>₹{dish.price}<br></br>{dish.restoName}</p>
                </div>
              </Link>
              <button className='btn' onClick={() => addToCart(dish._id)}>Add To Cart</button>
            </div>
          ))
        ) : (
          <div>No results found.</div>
        )}
      </div>
    </SearchContainer>
  );
};

export default SearchContent;
const SearchContainer = styled.div`
margin-top:50px;
.Dish{
display:grid;
grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
gap:1.5rem;
}
.searchItem{
display:flex;
flex-direction:column;
justify-content:center;
align-items:center;
background:#fff;
border:1px solid #ddd;
border-radius:10px;
padding:1rem;
gap:1rem;
box-shadow:0 4px 12px rgba(0,0,0,0.06);
}
  .searchItem img{
    height:250px;
    width:300px;
    object-fit: cover;
    border-radius: 6px;
  }

  .details{
   color:black;

  }
  @media (max-width: 768px) {
  .searchItem {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 1rem;
  }
}

`;
