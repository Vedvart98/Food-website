import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './EditDish.css'
import { toast } from 'react-toastify';
import { assets } from '../../assets/assets'

const EditDish = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    restoName: '',
    review: '',
    description: '',
    ingredients: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch the dish/restaurant by id and setFormData
    const token = localStorage.getItem('token');
    axios.get(`/api/dishes/${id}`,{
      headers:{
        'Authorization' : `Bearer ${token}`
      }
    })
      .then(res => {
        const dish = res.data.dish || res.data;
        console.log(id);
        setFormData({
          name: dish.name || '',
          price: dish.price || '',
          restoName: dish.restoName || '',
          review: dish.review || '',
          description: dish.description || '',
          ingredients: dish.ingredients || ''
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
    console.log("id " + id);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("id " + id);

    try {
      const updatedFormData = new FormData();
      updatedFormData.append('name', formData.name);
      updatedFormData.append('price', formData.price);
      updatedFormData.append('restoName', formData.restoName);
      updatedFormData.append('review', formData.review);
      updatedFormData.append('description', formData.description);
      updatedFormData.append('ingredients', formData.ingredients);

      if (image) {
        updatedFormData.append('image', image);  // update/apend image only if image is selected
      }

      const token = localStorage.getItem('token');
      const res = await axios.put(`http://localhost:5000/api/dishes/${id}`, updatedFormData, {
        headers: {
          'Authorization' : `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      if (res.data.success) {
        setFormData({
          name: '',
          price: '',
          restoName: '',
          review: '',
          description: '',
          ingredients: ''
        });
        setImage(null);
        setPreview(null);
        navigate('/listDishes');
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
    <div className='edit'>
      <h2>Edit Dish</h2>
      <form onSubmit={handleSubmit}>
        <div className="updateImage">
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
        <div className="dish-details">
          <input type='text' onChange={handleChange} value={formData.name} name="name" placeholder="Name" required />
          <input type="number" name="price" value={formData.price} onChange={handleChange} placeholder="Price" required />
          <input type='text' name="restoName" value={formData.restoName} onChange={handleChange} placeholder="Restaurant Name" required />
          <input type='number' name="review" value={formData.review} onChange={handleChange} placeholder='Review' required />
          <input type="text" name="description" value={formData.description} onChange={handleChange} placeholder='Description' required />
          <input type="text" name="ingredients" value={formData.ingredients} onChange={handleChange} placeholder='Ingredients' required />
        </div>
          <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default EditDish;