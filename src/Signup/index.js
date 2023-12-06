
import { useState } from 'react';


function Register() {

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
//   const [passwordConfirm, setConfirmPassword] = useState('');
  const [isBuyer, setIsBuyer] = useState(false);
  const [mobilenum, setMobilenum] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, email, password, isBuyer, mobilenum);

    // Call API to submit form data
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register</h2>

      <label>User Name</label>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}  
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
        value={true}
        checked={isBuyer === true}
        onChange={() => setIsBuyer(true)}
    />
    </div>
   
    <div>
    <label>Seller</label>
    <input
        type="radio"  
        value={false}
        checked={isBuyer === false}
        onChange={() => setIsBuyer(false)} 
    />
    </div>

      <button type="submit">Register</button>
    </form>
  );
}

export default Register;