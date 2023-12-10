import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { addtoCart } from "../Cart/CartReducer";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import Comments from "./Comments";
import { useDispatch } from "react-redux";
import { UpdateCart } from "../Cart/client";
import { useAuth } from '../Home/AuthContext'; 
import { Link } from "react-router-dom";
import { MDBBreadcrumb, MDBBreadcrumbItem, MDBCol, MDBContainer, MDBRow } from "mdb-react-ui-kit";
import NavBar from "../Navbar";

function ProductDetails() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const { user, logout } = useAuth();

  const handleAddToCart = (productId) => {
    UpdateCart(user.id, productId).then((product) => {
      dispatch(addtoCart(product));
    });
  };

  useEffect(() => {
    fetch(`https://cs5610-final-56af3c7859e7.herokuapp.com/products/${productId}`)
      .then((response) => response.json())
      .then((data) => setProduct(data));
  }, [productId]);

  return (<div>
    <NavBar/>
    <div className="row">
      {product && (
        <div className="product col-12 p-5">
          <div className="product-image">
            <img src={product.image} alt={product.title} />
          </div>
          <div className="product-info p-5 ms-5">
            <h2>{product.title}</h2>
            <p>{product.description}</p>
            <p>
              <strong>Price:</strong> ${product.price}
            </p>
            <p>
              <strong>Category:</strong> {product.category}
            </p>
            <div>
              <strong>Rating:</strong> <StarRating rating={product.rate} />
            </div>
            <div>
              <strong>Seller:</strong> <Link to={`/sellerProfile/${product.seller_id}`}>{product.seller_name}</Link>

            </div>
            <button
              className="btn btn-warning"
              onClick={() => {
                if (!user) {
                  alert("Please login first");
                  navigate("/login");
                  return;
                }
                handleAddToCart(product.id);
                navigate("/cart");
              }}
            >
              Add to Cart
            </button>
          </div>
        </div>
      )}
      <div className="row">
        <Comments />
      </div>
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
