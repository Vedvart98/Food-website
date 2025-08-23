import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import './AddRestaurant.css';
import { toast } from 'react-toastify';
import { assets } from '../../assets/assets';

const AddRestaurant = () => {
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [data, setData] = useState({
        restoName: '',
        description: '',
        review: '',
        location: '',
    });
    const handleChange = (e) => {
        console.log('chaange');
        const name = e.target.name;
        const value = e.target.value;
        setData((prev) => ({
            ...prev,
            [name]: value
        }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('submit');
        const formData = new FormData();
        formData.append('restoName', data.restoName);
        formData.append('description', data.description);
        formData.append('review', data.review);
        formData.append('location', data.location);
        formData.append('image', image);
        try {
            const token = localStorage.getItem('token');
            const res = await axios.post(`http://localhost:5000/api/restaurants`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`
                }
            });
            if (res.data.success) {
                console.log('success');
                setData({
                    restoName: '',
                    description: '',
                    review: '',
                    location: ''
                })
                setImage(null);
                setPreview(null);
                toast.success(res.data.message);
            }
            else {
                console.log("hi")
                console.error(res.data.message);
                toast.error('Failed to add Restaurant');
            }
        } catch (err) {
            console.log('rtrtr');
            console.error(err);
            toast.error('Failed to add Restaurant');
        }

    };
    return (
        <div className='add-resto'>
            <form action="" onSubmit={handleSubmit}>
                <div className="imageUpload">
                    <p>please upload image here</p>
                    <label htmlFor="image">
                        <img src={preview || assets.upload} alt="upload image" height={75} width={75} />
                    </label>
                    <input type="file" name="image" id="image" onChange={(e) => {
                        const file = e.target.files[0];
                        setImage(file);
                        setPreview(URL.createObjectURL(file));
                    }} hidden required/>
                </div>
                <div className='resto-details'>

                    <div className="addRestoName">
                        <label htmlFor="restoName">Restaurant Name: </label>
                        <input type="text" name="restoName" id="restoName" onChange={handleChange} value={data.restoName} placeholder='Enter restaurant name' required />
                    </div>
                    <div className="description">
                        <label htmlFor="description">Description: </label>
                        <input type="text" name="description" id="description" onChange={handleChange} value={data.description} placeholder='Enter Restaurant Description' required />
                    </div>
                    <div className="addReview">
                        <label htmlFor="review">Review: </label>
                        <input type="number" name="review" id="review" onChange={handleChange} value={data.review} placeholder='Enter review' required />
                    </div>
                    <div className="addLocation">
                        <label htmlFor="location">Location: </label>
                        <input type="text" name="location" id="location" onChange={handleChange} value={data.location} placeholder='Enter Location' required />
                    </div>
                </div>
                <div>
                    <button className='btn' type="submit">Add Restaurant</button>
                </div>
            </form>
        </div>
    )
}

export default AddRestaurant