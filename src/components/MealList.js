import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';

const MealList = () => {
  const cloudinaryRef = useRef();
  const widgetRef = useRef();
  const [image_url, setImage_url] = useState('');
  const [meals, setMeals] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    caterer_id: '', // Initialize caterer_id as an empty string
  });
  const [caterers, setCaterers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: 'dizhfsddx',
        uploadPreset: 'giftkimani',
      },
      function (error, result) {
        if (!error && result && result.event === 'success') {
          setImage_url(result.info.secure_url);
        }
      }
    );
  }, []);

  useEffect(() => {
    const fetchCaterers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/caterers');
        setCaterers(response.data.caterers);
      } catch (error) {
        setError('Error fetching caterers');
      }
    };
    fetchCaterers();
  }, []);

  const fetchMeals = async () => {
    try {
      const token = localStorage.getItem('access-token');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const response = await axios.get('http://localhost:5000/meals', config);
      setMeals(response.data.meals);
    } catch (error) {
      setError('Error fetching meals');
    }
  };

  const addMeal = async () => {
    try {
      const token = localStorage.getItem('access-token');
      const config = { headers: { Authorization: `Bearer ${token}` } };

      const formDataWithImage = { ...formData, image_url: image_url };

      const response = await axios.post(
        'http://localhost:5000/meals',
        formDataWithImage,
        config
      );
      alert(response.data.message);
      fetchMeals();
    } catch (error) {
      setError('Error adding meal');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCatererChange = (e) => {
    const selectedCatererId = e.target.value;
    setFormData({ ...formData, caterer_id: selectedCatererId });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addMeal();
  };

  useEffect(() => {
    fetchMeals();
  }, []);

  return (
    <div>
      <h1>Manage Meals</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name: </label>
          <input type="text" name="name" onChange={handleChange} />
        </div>
        <div>
          <label>Description: </label>
          <input type="text" name="description" onChange={handleChange} />
        </div>
        <div>
          <label>Price: </label>
          <input type="number" name="price" onChange={handleChange} />
        </div>
        <div>
          <label>Image URL: </label>
          <input type="text" value={image_url} readOnly />
          <button type="button" onClick={() => widgetRef.current.open()}>
            Upload Image
          </button>
        </div>
        <div>
          <label>Caterer id:</label>
          <select
            name="caterer_id"
            value={formData.caterer_id}
            onChange={handleCatererChange}
          >
            <option value="">Select a caterer</option>
            {caterers.map((caterer) => (
              <option key={caterer.caterer_id} value={caterer.caterer_id}>
                {caterer.name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Add Meal</button>
      </form>
      {error && <p>{error}</p>}
      <h2>Meals</h2>
      <ul>
        {meals &&
          meals.map((meal) => (
            <li key={meal.id}>
              <p>Name: {meal.name}</p>
              <p>Description: {meal.description}</p>
              <p>Price: ${meal.price}</p>
              <p>Caterer ID: {meal.caterer_id}</p>
              <img src={meal.image_url} alt={meal.name} />
            </li>
          ))}
      </ul>
    </div>
  );
};

export default MealList;
