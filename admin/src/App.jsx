import React from 'react'
import Navbar from './components/Navbar/Navbar'
import './App.css'
import { ToastContainer } from 'react-toastify'
import Sidebar from './components/Sidebar/Sidebar'
import { Route, Routes } from 'react-router-dom'
import Add from './Pages/Add/add'
import 'react-toastify/dist/ReactToastify.css'
import Order from './Pages/order/Order'

import Dashboard from './Pages/Dashboard/Dashboard'
import Edit from './Pages/Edit/Edit'
import List from './Pages/list/List'
import RestoList from './Pages/RestaurantList/RestaurantList'
import AddRestaurant from './Pages/AddRestaurant/AddRestaurant'
const App = () => {
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
              <Route path='/add' element={<Add />} />
              <Route path='/addRestaurant' element={<AddRestaurant />} />
              <Route path='/order' element={<Order />} />
              <Route path='/listDishes' element={<List />} />
              <Route path='/edit/:id' element={<Edit />} />
              <Route path='/listRestaurants' element={<RestoList />} />
            </Routes>
          </div>
        </div>
      </div>

    </>
  )
}

export default App