import React from 'react'
import Navbar from './components/Navbar'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './components/Login'
import { useState } from 'react'
import Home from './Pages/Home'
import Cart from './Pages/Cart'
import Dishes from './Pages/Dishes'
import SearchContent from './Pages/SearchContent'
import LocationList from './components/LocationList/LocationList'
import Menu from './components/Menu/Menu'
import Checkout from './Pages/Checkout'
import { ToastContainer } from 'react-toastify'
import Signup from './components/Signup'
import Profile from './Pages/Profile'
import OrderTrack from './components/orderTrack/OrderTrack'
import DishType from './components/DishType/DishType'
function App() {
  const [showLogin, setShowLogin] = useState(false);
  return (
    <>
      <div className='app'>

        <Navbar setShowLogin={setShowLogin} />

        <ToastContainer />

        <Routes>

          <Route path='/' element={<Home />} />
          <Route path='/menu' element={<Menu />} />
          <Route path='/results' element={<LocationList />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/dishes' element={<Dishes />} />
          <Route path='/search' element={<SearchContent />} /> 
          <Route path='/checkout' element={<Checkout />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/OrderTrack' element={<OrderTrack />} />
          <Route path='/dish/:dishId' element={<DishType />} />
        </Routes>

      </div>
    </>
  )
}

export default App 