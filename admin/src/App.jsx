import React, { useEffect } from 'react'
import Navbar from './components/Navbar/Navbar'
import './App.css'
import { ToastContainer } from 'react-toastify'
import Sidebar from './components/Sidebar/Sidebar'
import { Route, Routes } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'

import Dashboard from './Pages/Dashboard/Dashboard'
import RestoList from './Pages/RestaurantList/RestaurantList'
import AddRestaurant from './Pages/AddRestaurant/AddRestaurant'
import AddDish from './Pages/AddDish/addDish'
import OrderList from './Pages/OrderList/OrderList'
import EditDish from './Pages/EditDish/EditDish'
import DishList from './Pages/DishList/DishList'
import EditResto from './Pages/EditRestaurant/restoEdit'
import { formToJSON } from 'axios'
const App = () => {
  useEffect(()=>{
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    if(token){
      localStorage.setItem('token',token);
      const newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname;
      window.history.replaceState({},document.title,newUrl);
    }
  },[]);
  return (
    <>
      <div>
        <ToastContainer />
        <Navbar />

        <div className="app-content">
          <Sidebar />
          <div className="content">

            <Routes>
              <Route path='/' element={<Dashboard />} />
              <Route path='/add' element={<AddDish />} />
              <Route path='/addRestaurant' element={<AddRestaurant />} />
              <Route path='/orders' element={<OrderList />} />
              <Route path='/listDishes' element={<DishList />} />
              <Route path='/edit/:id' element={<EditDish />} />
              <Route path='/listRestaurants' element={<RestoList />} />
              <Route path='/editRestaurant/:id' element={<EditResto />} />
            </Routes>
          </div>
        </div>
      </div>

    </>
  )
}

export default App