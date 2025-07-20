import axios from 'axios';
import React, { useEffect, useState } from 'react'
import './order.css'
const API_URL = import.meta.env.REACT_APP_API_URL;

const Order = () => {
  const [orders, setOrders] = useState([]);
  const fetchAllOrders = async () => {
    try {

      const res = await axios.get(`${API_URL}/api/orders/list`);
      if (res.data.success) {
        setOrders(res.data.data);
        console.log(res.data.data);
      }
      else {
        console.error('failed to fetch orders');
      }
    } catch (err) {
      console.error('Something went wrong while fetching orders', err);
    }
  };
  const statusHandler = async (event, _id) => {
    try {

      const res = await axios.put(`${API_URL}/api/orders/status`, {
        _id,
        status: event.target.value,
      });

      if (res.data.success) {
        fetchAllOrders(); //refersh the order list
      }
      else {
        console.error('Failed to update order status')
      }
    } catch (err) {
      console.error('Error updating order status', err);
    }
  };
  useEffect(() => {
    fetchAllOrders();
  }, []);
  return (

    <div className='order'>
      <h3>Order Page</h3>
      <div className="order-list">
        {orders.map((order) => {
          return (
            <div className="order-item" key={order._id}>
              <div>
                <p className="order-item-food"><strong>Items: </strong>
                  {order.items?.map((item, index) => {
                    if (index === order.items.length - 1) {
                      return item.name + " x " + item.quantity;
                    }
                    else {
                      return item.name + " x " + item.quantity + " , ";
                    }
                  })}
                </p>
                <p><strong>OrderID</strong> : {order._id}</p>
                <p><strong>Name: </strong>{order.name}</p>
                <p className='order-item-name'><strong>Delivery Location:</strong> {order.address}</p>
                <p><strong>Total Items:</strong> {order.items.length}</p>
                <p><strong>Total:</strong> $ {order.amount}</p>
                <select onChange={(event) => statusHandler(event, order._id)}
                  value={order.status}>
                  <option value="Food Processing">Food processing</option>
                  <option value="Out for delivery">Out for delivery</option>
                  <option value="Delivered">delivered</option>
                </select>
              </div>

            </div>
          );
        })}
      </div>
    </div>
  )
}

export default Order