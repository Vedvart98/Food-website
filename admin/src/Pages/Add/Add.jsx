import React from 'react'
import { useState } from 'react'
import './add.css'
import axios from 'axios'
import { assets } from '../../assets/assets'
import { toast } from 'react-toastify'
const API_URL = import.meta.env.REACT_APP_API_URL;

const Add = () => {
  const [image, setImage] = useState(null)
  const [preview, setPreview] = useState(null);
  const [data, setData] = useState({
    name: '',
    price: '',
    hotelName: '',
    review: ''
    // imageurl:''
  });
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((prev) => ({
      ...prev,
      [name]: value
    }));

  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('price', data.price);
    formData.append('hotelName', data.hotelName);
    formData.append('review', data.review);
    formData.append('image', image);

    try {
      const token = localStorage.getItem('token');
      const res = await axios.post(`${API_URL}/api/dishes`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      });
      if (res.data.success) {
        setData({
          name: '',
          price: '',
          hotelName: '',
          review: ''
        });
        setImage(null);
        setPreview(null);

        toast.success(res.data.message);
      } else {
        console.error(res.data.message);
        toast.error('Failed to add dish');
      }
    } catch (err) {
      console.error(err);
      toast.error('Failed to add dish');
    }
  };
  return (
    <>
      <div className="add">
        <form action="" onSubmit={handleSubmit}>
          <div className="imageUpload">
            <p>Please Upload image here</p>
            <label htmlFor="image">
              <img src={preview || assets.upload} alt="Preview" height={75} width={75} style={{ cursor: 'pointer' }} />
            </label>
            <input type="file" id='image' alt="" onChange={(e) => {
              const file = e.target.files[0];
              setImage(file);
              setPreview(URL.createObjectURL(file));
            }} hidden />
          </div>
          <div className='dish-details'>
            <div className="add-product-name">
              <p>Dish name</p>
              <input type="text" onChange={handleChange} value={data.name} required name='name' placeholder='enter dish name here' />
            </div>
            <div className="add-product-price">
              <p>Dish price</p>
              <input type="number" onChange={handleChange} value={data.price} required name='price' placeholder='enter dish price here' />
            </div>
            <div className="add-product-hotelname">
              <p>Dish hotel name</p>
              <input type="text" onChange={handleChange} value={data.hotelName} required name='hotelName' placeholder='enter hotel name here' />
            </div>
            <div className='add-product-review'>
              <p>Dish Review</p>
              <input type="text" name="review" onChange={handleChange} value={data.review} placeholder='Give Review' required />
            </div>
          </div>
          <div>
            <button type="submit">Add Dish</button>
          </div>
        </form>
      </div>
    </>
  )
}

export default Add