import { useState } from "react";
import { setCart } from "./CartReducer";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import { RemoveFromCart } from "./client";
import { Link } from "react-router-dom";
import "./index.css";
import NavBar from "../Navbar";
function Cart() {
  const dispatch = useDispatch();
  const [products, setProducts] = useState(null);
  const currentUser = { name: "John Doe", id: 1, isActive: true };
  const { cart } = useSelector((state) => state.cartReducer);
  console.log("cart", cart);

  const handleRemoveFromCart = (cartId) => {
    RemoveFromCart(cartId).then(() => {
      const newCart = cart.filter((item) => item.id !== cartId);
      dispatch(setCart(newCart));
    });
  };

  useEffect(() => {
    fetch(`https://cs5610-final-56af3c7859e7.herokuapp.com/cart/`)
      .then((response) => response.json())
      .then((data) => {
        dispatch(setCart(data));
      });

    fetch(`https://cs5610-final-56af3c7859e7.herokuapp.com/products/`)
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }, []);

  return (
    <><NavBar></NavBar>
    <Container>
      <h1 className="my-4">Cart</h1>
      {cart.length === 0 ? (
        <div>
          <p>Your cart is empty.</p>
          <Link to="/home">Go to Home Page</Link>
        </div>
      ) : (
        cart &&
        products &&
        cart.map((item) => {
          if (item.user_id == currentUser.id) {
            const product = products.find((product) => product.id === item.product_id);
            console.log("product", product);
            return (
              <Card key={item.product_id} className="mb-4">
                <Row className="no-gutters">
                  <Col md={4}>
                    <Card.Img variant="top" src={product.image} className="cart-product-image" />
                  </Col>
                  <Col md={8}>
                    <Card.Body>
                      <Card.Title>{product.title}</Card.Title>
                      <Card.Text className="product-description">{product.description}</Card.Text>
                      <Button variant="danger" onClick={() => handleRemoveFromCart(item.id)}>
                        Remove from Cart
                      </Button>
                    </Card.Body>
                  </Col>
                </Row>
              </Card>
            );
          }
        })
      )}
    </Container>
    </>
  );
}

export default Cart;
