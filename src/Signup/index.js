import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Signup } from "./client";
import { useAuth } from "../Home/AuthContext";
import 'bootstrap/dist/css/bootstrap.min.css';

function Register() {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isBuyer, setIsBuyer] = useState(true);
  const [mobilenum, setMobilenum] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const { login } = useAuth();

  const handleSubmit = async () => {
    try {
      const response = await Signup(
        username,
        name,
        password,
        email,
        mobilenum,
        isBuyer,
        description
      );
      login(response);
      navigate("/home");
    } catch (error) {
      alert("Failed to sign up");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="col-md-10 m-5">
      <h2>Register</h2>

      <label>User Name</label>
      <input
      className="form-control"
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <label>Name</label>
      <input
      className="form-control"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <label>Email</label>
      <input
      className="form-control"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <label>Phone</label>
      <input
      className="form-control"
        type="text"
        value={mobilenum}
        onChange={(e) => setMobilenum(e.target.value)}
      />

      <label>Password</label>
      <input
      className="form-control"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <br></br>
      <div>
        <label>Buyer</label>
        <input
          type="radio"
          checked={isBuyer === true}
          onChange={() => setIsBuyer(true)}
        />
      </div>

      <div>
        <label>Seller</label>
        <input
          type="radio"
          checked={isBuyer === false}
          onChange={() => setIsBuyer(false)}
        />
      </div>

      {isBuyer === false && (
        <div>
          <label>Description</label>
          <textarea
          className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
      )}
      <br></br>
      <button className="btn btn-primary" type="submit">Register</button>
    </form>
  );
}

export default Register;
