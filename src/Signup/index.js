import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Signup } from "./client";
import { useAuth } from "../Home/AuthContext";

function Register() {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //   const [passwordConfirm, setConfirmPassword] = useState('');
  const [isBuyer, setIsBuyer] = useState(false);
  const [mobilenum, setMobilenum] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const { login } = useAuth();

  const handleSubmit = async () => {
    // e.preventDefault();
    // console.log(username, email, password, isBuyer, mobilenum);

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
      login(username);
      navigate("/home");
    } catch (error) {
      console.log(error);
      alert("Failed to sign in");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register</h2>

      <label>User Name</label>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <label>Name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <label>Email</label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <label>Phone</label>
      <input
        type="text"
        value={mobilenum}
        onChange={(e) => setMobilenum(e.target.value)}
      />

      <label>Password</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {/* <label>Confirm Password</label>
        <input
          type="password"
          value={passwordConfirm}
          onChange={(e) => setConfirmPassword(e.target.value)}
        /> */}

      {/* <label>Buyer</label>
        <input
          type="radio"
          value={isBuyer}
          onChange={(e) => setIsBuyer(e.target.value)}
        /> */}

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
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
      )}

      <button type="submit">Register</button>
    </form>
  );
}

export default Register;
