// \/
import React, { useContext, useMemo } from 'react'
import { StoreContext } from '../Context/StoreContext'
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useAuth } from '../Context/authContext';
const API_URL = import.meta.env.REACT_APP_API_URL;

const Cart = () => {
  const { cartItem, dishes, removeCartItem, getTotalCartAmount, dishById } = useContext(StoreContext);
  const { isAuthenticated, loading } = useAuth();
  const getTotalItems = () => {
    let total = 0;
    for (let dish in cartItem) {
      const quantity = cartItem[dish];
      total += quantity;
    }
    return total;
  };

  return (
    <CartContainer className='cart'>
      <div className='cart-items'>
        <div className='cart-items-title'>
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <hr />
        {Object.keys(cartItem).length === 0 && <p>You cart is empty!!</p>}
        {Object.entries(cartItem).map(([_id, quantity]) => {
          const dish = dishById.get(_id);
          if (!dish) return null;  //safeguard

          return (
            <div className='cart-items-item' key={_id}>
              <img src={`${API_URL}${dish.imageUrl}`} alt={dish.name} style={{ width: '60px', height: '60px' }} />

              <p>{dish.name}</p>
              <p>$ {dish.price}</p>
              <p>{quantity}</p>
              <p>$ {dish.price * quantity}</p>
              <img onClick={() => removeCartItem(_id)} src="https://cdn-icons-png.freepik.com/256/484/484611.png?ga=GA1.1.1249373621.1745418540&semt=ais_hybrid" alt="" />
            </div>
          );
        })}
      </div>
      <div className='cartTotal'>
        <h2>Total Items: {getTotalItems()}</h2>
        <p>Total Amount: ${getTotalCartAmount()}</p>
        {getTotalItems() > 0 ? (
          isAuthenticated ? (
            <Link to='/checkout'>
              <button className='btn'>PROCEED TO CHECKOUT</button>
            </Link>
          ) :
            (
              // If not authenticated, redirect to login
              <Link to='/login'>
                <button className='btn' onClick={() => alert('Please login first')}>PROCEED TO CHECKOUT</button>
              </Link>
            )

        )
          : (
            <Link to='/' style={{ textDecoration: 'none' }}>
              <p>Add Items to cart first</p>
            </Link>
          )

        }

      </div>
    </CartContainer>
  );
};

export default Cart;
const CartContainer = styled.div`
  margin:100px 0px;
  display:flex;
  justify-content:space-between;

.cart-items{
display:flex;
flex-direction:column;
gap:20px;
}

.cart-items-title{
display: grid;
  grid-template-columns: 1fr 2fr 1fr 1fr 1fr 1fr;
  gap:60px;
  }
.cart-items-item{
  display: grid;
  grid-template-columns: 1fr 2fr 1fr 1fr 1fr 1fr;
  gap:60px;
}
.cart-items-item img{
height:15px;
width:15px;
}
.cartTotal{
display:flex;
flex-direction:column;
align-items:center;
gap:15px;
}
@media (max-width: 768px) {
  .cart-items-title, .cart-items-item {
    grid-template-columns: repeat(2, 1fr);
    gap: 15px;
  }
}
`;