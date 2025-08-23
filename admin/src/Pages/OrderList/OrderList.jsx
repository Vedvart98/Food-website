import axios from 'axios';
import React, { useEffect, useState } from 'react'
import './OrderList.css'

const OrderList= () => {
  const [orders, setOrders] = useState([]);
  const fetchAllOrders = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`http://localhost:5000/api/orders/list`,{
        headers: {
          'Authorization' : `Bearer ${token}`
        }
      });
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
      const token = localStorage.getItem('token');
      const res = await axios.put(`http://localhost:5000/api/orders/status` ,{
        _id,
        status: event.target.value,
      },{
        headers:{
          'Authorization' : `Bearer ${token}`
        }
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
  const handleDelete = async(id)=>{
    const token = localStorage.getItem('token');
    axios.delete(`http://localhost:5000/api/orders/${id}`,{
      headers:{
        'Authorization' : `Bearer ${token}`
      }
    }).then(()=>{
      setOrders(orders.filter(order => order._id !== id));
    })
  };
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
                <p><strong>Total:</strong> ₹ {order.amount}</p>
                <select onChange={(event) => statusHandler(event, order._id)}
                  value={order.status}>
                  <option value="Food Processing">Food processing</option>
                  <option value="Out for delivery">Out for delivery</option>
                  <option value="Delivered">delivered</option>
                </select>
                <button className='order-delete-btn' onClick={()=> handleDelete(order._id)}>
                  &#128465; Delete
                </button>
              </div>

            </div>
          );
        })}
      </div>
    </div>
  )
}

export default OrderList