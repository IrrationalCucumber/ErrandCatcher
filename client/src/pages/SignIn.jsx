import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const SignIn = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userID, setUserID] = useState(''); // Add userID state

  const navigate = useNavigate();

  const handleClick = async () => {
    try {
      const res = await axios.get('http://localhost:8800/sign-in', {
        params: { username: username, password: password },
      });

      const user = res.data[0];

      if (user) {
        setUserID(user.userID); // Store the userID
        if (user.accountType === 'Employer') {
          navigate(`/e-home/${user.userID}`); // Pass userID as a parameter
        } else if (user.accountType === 'admin') {
          navigate(`/admin-home/${user.userID}`); // Pass userID as a parameter
        } else if (user.accountType === 'Catcher') {
          navigate(`/c-home/${user.userID}`); // Pass userID as a parameter
        }
      } else {
        console.log('Invalid credentials');
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <input
        name="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        type="text"
        placeholder="Username"
      />
      <input
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        placeholder="Password"
      />
      
      <button onClick={handleClick}>Sign In</button>
      <Link to="/sign-up" >Don't have an Account? Sign up here!</Link>
    </div>
  );
};

export default SignIn;
