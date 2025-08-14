import './orderTrack.css'
import React, { useState } from 'react'
import authService from '../../service/authService';

const OrderTrack = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [button, setButton] = useState(true);
  const trackHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setButton(false);
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      if (!user || !user._id) {
        setError('User not logged in');
        setLoading(false);
        return;
      }
      const res = await authService.makeAuthenticatedRequest(`http://localhost:5000/api/orders/list`);
      console.log('res');
      console.log(res);
      if (!res) {
        setError('Not authenticated');
        setLoading(false);
        return;
      }
      const data = await res.json();
      console.log('data');
      console.log(data);

      if (data.success && Array.isArray(data.data)) {
        //filter orders for current user
        const myOrders = data.data.filter(order => {
          console.log("Checking order:", order.orderId, "user =", order.user);
          if (typeof order.user === 'object' && order.user !== null) {
            return order.user._id?.toString() === user._id?.toString();
          }
          return order.user?.toString() === user._id?.toString();
        }).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
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
      {button && (

        <button onClick={trackHandler} disabled={loading} className='trackButton'>
          {loading ? 'Loading...' : 'Show my orders'}
        </button>
      )}
      {error && <div className='errorMessage'>{error}</div>}
      {orders.length > 0 &&(
        <ul className="orderList">
          {orders.map((order) => (
            <li key={order._id} className="orderCard">
              <div className="orderHeader">
                <p><strong>Order ID:</strong> {order._id}</p>
                <p><strong>Status:</strong> {order.status}</p>
                <p><strong>Ordered On:</strong> {new Date(order.createdAt).toLocaleString()}</p>
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