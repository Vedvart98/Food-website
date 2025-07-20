import React, { useContext, useMemo, useState } from 'react';
import { StoreContext } from '../Context/StoreContext';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
const API_URL = import.meta.env.REACT_APP_API_URL;

function useQuery() {
  return new URLSearchParams(useLocation().search);
}
const SearchContent = () => {
  // for hotels/dishes
  const query = useQuery().get('query') || ''; //
  const { dishes, addToCart, hotels } = useContext(StoreContext);
  const filteredDishes = useMemo(() => {
    const q = query.toLowerCase();
    return dishes.filter(
      (d) =>
        d.name.toLowerCase().includes(q) ||
        d.hotelName.toLowerCase().includes(q)
    );

  }, [query, dishes]);


  return (
    <SearchContainer className='search-page'>
      <h2>Results for {query}</h2>
      <div className='Dish'>
        {filteredDishes.length > 0 ? (
          filteredDishes.map((dish, _id) => (
            <div className="searchItem" key={_id}>
              <img src={`${API_URL}${dish.imageUrl}`} alt={dish.name} />
              <div>
                <h3>{dish.name}</h3>
                <h5>{dish.hotelName}</h5>
                <p>${dish.price}<br></br>{dish.hotelName}</p>
              </div>
              <button className='btn' onClick={() => addToCart(dish._id)}>Add</button>
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
margin-top:100px;
.Dish{
display:flex;
flex-direction:column;
gap:20px;
}
.searchItem{
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap:80px;
  justify-content:center;
  align-items:center;
}
  .searchItem img{
    height:150px;
    width:150px;
    object-fit: cover;
    border-radius: 6px;
  }

  @media (max-width: 768px) {
  .searchItem {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 1rem;
  }
}

`;
