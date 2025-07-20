import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, data } from 'react-router-dom';
import axios from 'axios';
import './Edit.css'
import { toast } from 'react-toastify';
import { assets } from '../../assets/assets'
const API_URL = import.meta.env.REACT_APP_API_URL;

const Edit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    hotelName: '',
    review: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch the dish/hotel by id and setFormData
    axios.get(`/api/dishes/${id}`)
      .then(res => {
        const dish = res.data.dish || res.data;
        console.log(id);
        setFormData({
          name: dish.name || '',
          price: dish.price || '',
          hotelName: dish.hotelName || '',
          review: dish.review || ''
        });
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to fetch item');
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))
    console.log("id" + id);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("id " + id);

    try {
      const updatedFormData = new FormData();
      updatedFormData.append('name', formData.name);
      updatedFormData.append('price', formData.price);
      updatedFormData.append('hotelName', formData.hotelName);
      updatedFormData.append('review', formData.review);

      if (image) {
        updatedFormData.append('image', image);  // update/apend image only if image is selected
      }
      const res = await axios.put(`${API_URL}/api/dishes/${id}`, updatedFormData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      if (res.data.success) {
        console.log('hh');
        setFormData({
          name: '',
          price: '',
          hotelName: '',
          review: ''
        });
        setImage(null);
        setPreview(null);
        navigate('/list');
        console.log('gfg');
        toast.success(res.data.message);
      } else {
        console.error('Failed to update product');
        toast.error('Failed to update product');
      }
    } catch (err) {
      setError('Update failed');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2>Edit Dish/Hotel</h2>
      <form onSubmit={handleSubmit}>
        <div className="updataImage">
          <p>upload Image here</p>
          <label htmlFor="image">
            <img src={preview || assets.upload} alt="Preview" height={75} width={75} style={{ cursor: 'pointer' }} />
          </label>
          <input type="file" id="image" onChange={(e) => {
            const file = e.target.files[0];
            setImage(file);
            setPreview(URL.createObjectURL(file));
          }} hidden />
        </div>
        <input type='text' onChange={handleChange} value={formData.name} name="name" placeholder="Name" required />
        <input type="number" name="price" value={formData.price} onChange={handleChange} placeholder="Price" required />
        <input type='text' name="hotelName" value={formData.hotelName} onChange={handleChange} placeholder="Hotel Name" required />
        {/* <input name="imageurl" value={formData.imageUrl} onChange={handleChange} placeholder="Image URL" required /> */}
        <input type='number' name="review" value={formData.review} onChange={handleChange} placeholder='Review' required />
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default Edit;