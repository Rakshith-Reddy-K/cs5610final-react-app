import { useState } from "react";
import { setCart, setCartItems } from "./CartReducer";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';

import "./index.css";
function Cart() {
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
//   const [cartItems, setCartItems] = useState([]);
  const currentUser = { name: "John Doe", id: 1, isActive: true };
  const { cart } = useSelector((state) => state.cartReducer);
  console.log("cart", cart);
  const { cartItems } = useSelector((state) => state.cartReducer);
  
  const handleRemoveFromCart = (productId) => {
    const newCartItems = cart.filter((id) => id !== productId);
    dispatch(setCart(newCartItems));
  };
  const findCartItemsForUser = (userId) => {
    const cartItems = [];
    for (let i = 0; i < cart.length; i++) {
      if (cart[i].user_id == userId) {
        cartItems.push(cart[i].product_id);
      }
    }
    return cartItems;
  };

  useEffect(() => {
    fetch(`https://cs5610-final-56af3c7859e7.herokuapp.com/products/`)
      .then((response) => response.json())
      .then((data) => setProducts(data));
    fetch(`https://cs5610-final-56af3c7859e7.herokuapp.com/cart/`)
      .then((response) => response.json())
      .then((data) => {
        dispatch(setCart(data));
        dispatch(setCartItems(findCartItemsForUser(currentUser.id)));
      });
  }, [cartItems]);

  return (
    <Container>
    <h1 className="my-4">Cart</h1>
    {cartItems.map((productId) => {
      const product = products.find((product) => product.id === productId);
      return (
        <Card key={productId} className="mb-4">
          <Row className="no-gutters">
            <Col md={4}>
            <Card.Img variant="top" src={product.image} className="cart-product-image" />
            </Col>
            <Col md={8}>
              <Card.Body>
                <Card.Title>{product.title}</Card.Title>
                <Card.Text className="product-description">{product.description}</Card.Text>
                <Button variant="danger" onClick={() => handleRemoveFromCart(productId)}>Remove from Cart</Button>
              </Card.Body>
            </Col>
          </Row>
        </Card>
      );
    })}
  </Container>
  );
}

export default Cart;
