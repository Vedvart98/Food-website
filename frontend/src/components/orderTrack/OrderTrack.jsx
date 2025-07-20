import axios from 'axios';
import './orderTrack.css'
import React, { useState } from 'react'
import authService from '../../service/authService';
const API_URL = import.meta.env.REACT_APP_API_URL;

const OrderTrack = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const trackHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      if (!user || !user._id) {
        setError('User not logged in');
        setLoading(false);
        return;
      }
      const res = await authService.makeAuthenticatedRequest(`${API_URL}/api/orders/list`);
      console.log('res');
      console.log(res);
      if (!res) {
        setError('Not authenticated');
        setLoading(false);
        console.log('not res');
        return;
      }
      const data = await res.json();

      console.log('data');
      console.log(data);

      // }
      if (data.success && Array.isArray(data.data)) {
        //filter orders for current user
        const myOrders = data.data.filter(order => {
          if (typeof order.user === 'object' && order.user !== null) {
            return order.user._id === user._id;
          }
          return order.user === user._id;
        });
        setOrders(myOrders);
      }
      else {
        setError(data.message || 'Failed to fetch orders');
        console.log('error failed to fetch');
      }
    } catch (error) {
      setError('Order tracker failed')

    } finally {
      setLoading(false);
    }
  };
  return (
    <div className='trackContainer'>
      <h2>Track Orders</h2>
      <button onClick={trackHandler} disabled={loading} className='trackButton'>
        {loading ? 'Loading...' : 'Show my orders'}
      </button>
      {error && <div /*style={{ color: 'red' }}*/ className='errorMessage'>{error}</div>}
      {orders.length > 0 && (
        <ul className="orderList">
          {orders.map((order) => (
            <li key={order._id} className="orderCard">
              <div className="orderHeader">
                <p><strong>Order ID:</strong> {order._id}</p>
                <p><strong>Status:</strong> {order.status}</p>
              </div>
              <div className="orderBody">
                <p><strong>Name:</strong> {order.name}</p>
                <p><strong>Address:</strong> {order.address}</p>
                <p><strong>Total Amount:</strong> ₹{order.amount}</p>
              </div>
              <div className="orderItems">
                <h4>Items:</h4>
                <ul>
                  {order.items?.map((item, idx) => (
                    <li key={idx}>
                      {item.name} x {item.quantity} = ₹{item.price}/unit
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default OrderTrack