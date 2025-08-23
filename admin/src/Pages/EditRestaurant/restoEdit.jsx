import React from "react";
import axios from "axios";
import './restoEdit.css';
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { assets } from "../../assets/assets";
import { useNavigate, useParams } from "react-router-dom";
const EditResto = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [formData, setFormData] = useState({
        restoName: '',
        description: '',
        location: '',
        review: ''
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        axios.get(`/api/restaurants/${id}`)
            .then(res => {
                const restaurant = res.data.restaurant || res.data;
                console.log(id);
                setFormData({
                    restoName: restaurant.restoName || '',
                    description: restaurant.description || '',
                    location: restaurant.location || '',
                    review: restaurant.review || ''
                });
                setLoading(false);
            })
            .catch(() => {
                setError('Failed to fetch restaurant');
                setLoading(false);
            });
    }, [id]);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }))
        console.log("id" + id);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const updatedFormData = new FormData();
            updatedFormData.append('restoName', formData.restoName);
            updatedFormData.append('description', formData.description);
            updatedFormData.append('location', formData.location);
            updatedFormData.append('review', formData.review);

            if (image) {
                updatedFormData.append('image', image);
            }
            const token = localStorage.getItem('token');
            const res = await axios.put(`http://localhost:5000/api/restaurants/${id}`, updatedFormData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log('done');
            if (res.data.success) {
                setFormData({
                    restoName: '',
                    description: '',
                    location: '',
                    review: ''
                });
                setImage(null);
                setPreview(null);
                navigate('/listRestaurants')
                toast.success(res.data.message);
            } else {
                console.log("idvrjr" + id);
                console.error('Failed to update restaurant');
                toast.error('Failed to update restaurant');
            }
        } catch (err) {
            setError('Update failed')
        }
    };
    if (loading) return <div>Loading...</div>
    if (error) return <div>{error}</div>

    return (
        <div className="edit">
            <h2>Edit Restaurant</h2>
            <form onSubmit={handleSubmit}>
                <div className="updateImage">
                    <p>Upload image here</p>
                    <label htmlFor="image">
                        <img src={preview || assets.upload} alt="Preview" height={75} width={75} style={{ cursor: 'pointer' }} />
                    </label>
                    <input type="file" id="image" onChange={(e) => {
                        const file = e.target.files[0];
                        setImage(file);
                        setPreview(URL.createObjectURL(file));
                    }} hidden />
                </div>
                <div className="resto-details">
                    <input type="text" onChange={handleChange} value={formData.restoName} name="restoName" placeholder="Enter the restaurant name" required />
                    <input type="text" name="description" onChange={handleChange} value={formData.description} placeholder="Enter descripton for restaurant" required />
                    <input type="text" onChange={handleChange} value={formData.location} name="location" placeholder="Enter location" required />
                    <input type="number" onChange={handleChange} value={formData.review} name="review" placeholder="Enter review" required />
                </div>
                    <button type="submit">Update</button>
            </form>
        </div>
    );
};
export default EditResto;