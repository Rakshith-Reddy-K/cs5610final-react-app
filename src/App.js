import React from "react";
import { HashRouter } from "react-router-dom";
import "./App.css";
import { Routes, Route, Navigate } from "react-router";
import ProductDetails from "./ProductDetails";
import Home from "./Home";
import { Provider } from "react-redux";
import store from "./store";
function App() {
  return (
    <Provider store={store}>
      <HashRouter>
        <div>
          <Routes>
            <Route path="/" element={<Navigate to="/Home" />} />
            <Route path="/Home" element={<Home />} />
            <Route path="/details/:productId" element={<ProductDetails />} />
          </Routes>
        </div>
      </HashRouter>
    </Provider>
  );
}

export default App;
