import { useState } from "react";
import { setCart } from "./CartReducer";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
function Cart() {
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);

  const {cart} = useSelector((state) => state.cartReducer);
  console.log("cart", cart);

  const handleRemoveFromCart = (productId) => {
    const newCartItems = cart.filter((id) => id !== productId);
    dispatch(setCart(newCartItems));
  };

  useEffect(() => {
    fetch(`https://cs5610-final-56af3c7859e7.herokuapp.com/products/`)
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }, []);

  return (
    <div>
      <h1>Cart</h1>

      {cart.map((productId) => {
        const product = products.find((product) => product.id === productId);
        <div key={productId}>
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <button onClick={() => handleRemoveFromCart(productId)}>Remove from Cart</button>
        </div>;
      })}
    </div>
  );
}

export default Cart;
