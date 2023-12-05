import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'; 
import Comments from './Comments';
function ProductDetails() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`https://cs5610-final-56af3c7859e7.herokuapp.com/products/${productId}`)
      .then(response => response.json())
      .then(data => setProduct(data));
  }, [productId]);

  return (
    <div className="row">
      {product && (
        <div className="product col-12 p-5">
          <div className="product-image">
            <img src={product.image} alt={product.title} />
          </div>
          <div className="product-info p-5 ms-5">
            <h2>{product.title}</h2>
            <p>{product.description}</p>
            <p><strong>Price:</strong> ${product.price}</p>
            <p><strong>Category:</strong> {product.category}</p>
            <div><strong>Rating:</strong> <StarRating rating={product.rate}/></div>
            <button className='btn btn-warning'>Add to Cart</button>
          </div>
        </div>
      )}
      <div className='row'>
        <Comments />
      </div>
    </div>
  );
}
export default ProductDetails;

function StarRating({ rating }) {
  const stars = [];
  for (let i = 0; i < 5; i++) {
    if (i < rating) {
      stars.push(<span key={i}>&#9733;</span>); // filled star
    } else {
      stars.push(<span key={i}>&#9734;</span>); // empty star
    }
  }
  return <div>{stars}</div>;
}
