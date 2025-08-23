import axios from 'axios';
import React from 'react'
import './Dashboard.css'
import { useEffect } from 'react';
import { useState } from 'react';
const Dashboard = () => {
    const [dishes, setDishes] = useState([]);
    const [orders, setOrders] = useState([]);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    // Fetch data from the API
    useEffect(() => {
        const fetchAllData = async () => {  
            try {
                const token = localStorage.getItem('token');
                const headers = {'Authorization' : `Bearer ${token}`};
                const [dishResponse, orderResponse, userResponse] = await Promise.all([
                    axios.get(`http://localhost:5000/api/dishes` , {headers}),
                    axios.get(`http://localhost:5000/api/orders/list` , {headers}),
                    axios.get(`http://localhost:5000/api/users` , {headers})
                ]);
                
                setDishes(Array.isArray(dishResponse.data) ? dishResponse.data : []);
                setOrders(Array.isArray(orderResponse.data.data) ? orderResponse.data.data : []);
                setUsers(Array.isArray(userResponse.data.data) ? userResponse.data.data : []);
            } catch (err) {
                console.error('Failed to fetch data:', err);
                setError('Failed to fetch dashboard data');
            } finally {
                setLoading(false);
            }
        };
        
        fetchAllData();
    }
        , []);
    const getTotalOrders = () => {
        return orders.length;
    }
    const getTotalDishes = () => {
        return dishes.length;
    }
    const getTotalRevenue = () => {
        return orders.reduce((sum, order) => sum + (order.amount || order.totalAmount || 0), 0);
    };
    const getTotalUsers = () => {
        return users.length;
    }
    if (loading) return <p>Loading Dashboard...</p>
    if (error) return <p style={{ color: 'red' }}>{error}</p>
    return (
        <div className="dashboard-container">
            <div className="dashboard">
                <h2>Welcome to the Admin Dashboard</h2>
                <p>Manage your application from here.</p>
                <p>Use the sidebar to navigate through different sections.</p>
            </div>
            <div className="dashboard-stats">
                <div className="stat-item">
                    <h3>Total Orders</h3>
                    <p>{getTotalOrders()}</p>
                </div>
                <div className="stat-item">
                    <h3>Total Dishes</h3>
                    <p>{getTotalDishes()}</p>
                </div>
                <div className="stat-item">
                    <h3>Total Revenue</h3>
                    <p>₹{getTotalRevenue()}</p>
                </div>
                <div className="stat-item">
                    <h3>Total Users</h3>
                    <p>{getTotalUsers()}</p>
                </div>
            </div>
        </div>
    )
}

export default Dashboard