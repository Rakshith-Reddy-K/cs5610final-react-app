import React, { useEffect, useState } from "react";
import "./index.css";
import { useAuth } from "../Home/AuthContext";
import { BsTrash3Fill } from "react-icons/bs";
import { deleteProduct } from "./client";
const Seller = () => {
  const [products, setProducts] = useState([]);
  const { user } = useAuth();

  const handleDelete = (productId) => {
    try {
      deleteProduct(productId);
      setProducts(products.filter((p) => p.id !== productId));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      fetch(`https://cs5610-final-56af3c7859e7.herokuapp.com/products/`)
        .then((response) => response.json())
        .then((data) => setProducts(data));
    };
    fetchProducts();
  }, []);

  return (
    <div className="col-md-10 m-5">
      <h1>Product List Page</h1>
      {products && products.length > 0 && user.role === 2 && (
        <div>
          <h2>Products</h2>
          <table className="table table-bordered two-column-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Product Name</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              {products
                .filter((product) => product.seller_id == user.id)
                .map((product) => (
                  <tr key={product.id}>
                    <td>{product.id}</td>
                    <td>
                      <a href={`/profile/${product.id}`}>{product.title}</a>
                    </td>
                    <td>
                      <button className="btn btn-danger me-2">
                        <BsTrash3Fill onClick={() => handleDelete(product.id)} />
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Seller;
