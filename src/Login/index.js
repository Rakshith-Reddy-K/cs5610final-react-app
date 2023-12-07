import * as client from "./client";
import { useState } from "react";
import { useAuth } from '../Home/AuthContext'; 
import { useNavigate } from "react-router-dom";
function Login() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await client.Signin(username, password);
      console.log("here", response);
      if(response === 'Login successful'){
        const userData = await client.getUserByUsername(username)
        login(userData);
        navigate("/home");
      }
      else{
        alert(response);
      }
     
    } catch (error) {
      console.log(error);
      alert("Failed to sign in");
    }
  };
  return (
    <form onSubmit={handleSubmit} className="ms-5 col-md-10 p-5">
      <h2>Login</h2>

      <label>User Name</label>
      <input
      className="form-control"
        type="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <label>Password</label>
      <input
      className="form-control"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br></br>
      <button type="submit" className="btn btn-primary" >Login</button>
      <p className="ps-5"></p>
      <button type="button" className="btn btn-warning" onClick={() => navigate("/register")}>Sign Up</button>

     
    </form>
  );
}

export default Login;
