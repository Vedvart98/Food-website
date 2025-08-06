import React from 'react'
import Types from '../components/Types'
import Partners from '../components/Partners'
import Footer from './Footer'
import Menu from '../components/Menu/Menu'
import { useLocation } from 'react-router-dom'
import DishType from '../components/DishType/DishType'
const Home = () => {
  const query = new URLSearchParams(useLocation().search).get('query') || '';
  const showPartners = query.trim() !== "";      //show after seraching 
  return (
    <div>
      <Menu />
      {/* <DishType /> */}
      <Types />
      {showPartners && <Partners />}
      <Footer />
    </div>
  )
}

export default Home 