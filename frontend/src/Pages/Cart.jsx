// \/
import React, { useContext, useMemo } from 'react'
import { StoreContext } from '../Context/StoreContext'
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useAuth } from '../Context/authContext';
// const API_URL = import.meta.env.REACT_APP_API_URL;

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
      <div className='cartTotal'>
        <h2>Total Items: {getTotalItems()}</h2>
        <p>Total Amount: ${getTotalCartAmount()}</p>
        {getTotalItems() > 0 ? (
          isAuthenticated ? (
            <Link to='/checkout'>
              <button className='btn'>PROCEED TO CHECKOUT</button>
            </Link>
          )  :
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
      <div className='cart-items'>
        {Object.keys(cartItem).length === 0 && <p>You cart is empty!!</p>}
        {Object.entries(cartItem).map(([_id, quantity]) => {
          const dish = dishById.get(_id);
          if (!dish) return null;  //safeguard

          return (
            <div className='cart-items-item' key={_id}>
              <img src={`http://localhost:5000${dish.imageUrl}`} alt={dish.name} className='photo' />
            <div className='dish-details'>
              <p><h3>{dish.name}</h3></p>
              <p><strong>Price per unit:</strong> $ {dish.price}</p>
              <p><strong>Quantity:</strong> {quantity}</p>
              <p><strong>Total:</strong> $ {dish.price * quantity}</p>
            </div>
              <img onClick={() => removeCartItem(_id)} src="https://cdn-icons-png.freepik.com/256/484/484611.png?ga=GA1.1.1249373621.1745418540&semt=ais_hybrid" alt="" />
            </div>
          );
        })}
      </div>

    </CartContainer>
  );
};

export default Cart;
const CartContainer = styled.div`
  // margin:100px 0px;
  display:flex;
  flex-direction:column;
  gap:20px;

.cart-items{
display:grid;
grid-template-columns:repeat(auto-fill,minmax(300px,1fr));
gap:20px;
}

.cart-items-item{
  display:flex;
  flex-direction:column;
  border:1px solid #ddd;
  border-radius:10px;
  gap:1.5rem;
  padding:1.5rem;
  align-items:center;
  box-shadow:0 4px 12px rgba(0,0,0,0.1);
}
  .cart-items-item .photo{
  width:300px;
  height:200px;
  border-radius:10px;
  }
.cart-items-item img{
height:15px;
width:15px;
}
.dish-details{
  align-items:left;
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