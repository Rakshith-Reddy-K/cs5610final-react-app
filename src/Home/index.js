import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import Rating from './rating'; // Make sure to create this component
import './home.css'; 
import { useAuth } from './AuthContext';
import NavBar from '../Navbar';

// Debounce function
const debounce = (func, delay) => {
    let timerId;
    return (...args) => {
        if (timerId) {
            clearTimeout(timerId);
        }
        timerId = setTimeout(() => {
            func(...args);
        }, delay);
    };
};

const Home = () => {
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const { user, logout } = useAuth();
    // Function to fetch products
    const fetchProducts = async (search = '') => {
        try {
            const response = await axios.get(`https://cs5610-final-56af3c7859e7.herokuapp.com/products?search=${search}`);
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };
    // Debounced version of fetchProducts
    const debouncedFetchProducts = useCallback(debounce(fetchProducts, 500), []);

    // Handle search input change
    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
        debouncedFetchProducts(event.target.value);
    };

    useEffect(() => {
      fetchProducts();
  }, []);
  return (
      <div>
        <NavBar handleSearchChange={handleSearchChange}></NavBar>
         {/* <div className="login-status">
                {user ? (
                    <>
                        <span>Hello, <Link to={`/profile/${user.id}`}>{user.username}</Link></span>
                        <br></br>
                        <button onClick={handleLogout}>Logout</button>
                    </>
                ) : (
                    <Link to="/login">Hello, Sign up/Login</Link>
                )}
            </div> */}

          {/* <form onSubmit={(e) => e.preventDefault()} className="search-form">
              <input
                  type="text"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  placeholder="Search products..."
                  className="search-input"
              />
          </form> */}

          <div className="product-grid">
              {products.map(product => (
                  <div key={product.id} className="product-card">
                      <Link to={`/details/${product.id}`}>
                          <img src={product.image} alt={product.title} className="product-image" />
                          <div className="product-info">
                              <h5>{product.title}</h5>
                              <p>${product.price}</p>
                              <Rating rate={product.rate} /> 
                          </div>
                      </Link>
                  </div>
              ))}
          </div>
      </div>
  );
};

export default Home;