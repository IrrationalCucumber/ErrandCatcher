import React, { useState } from 'react';
import axios from 'axios';
  import { useNavigate, Link } from 'react-router-dom';
//import './Error.css'; // Import your custom CSS for styling

const SignIn = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userID, setUserID] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const handleClick = async () => {
    if (!username || !password) {
      setErrorMessage('Please fill in both username and password.');
      return;
    }

    try {
      const res = await axios.get('http://localhost:8800/sign-in', {
        params: { username: username, password: password },
      });

      const user = res.data[0];

      if (user) {
        setUserID(user.userID);
        if (user.accountType === 'Employer') {
          navigate(`/e-home/${user.userID}`);
        } else if (user.accountType === 'admin') {
          navigate(`/admin-home/${user.userID}`);
        } else if (user.accountType === 'Catcher') {
          navigate(`/c-home/${user.userID}`);
        }
      } else {
        setErrorMessage('Invalid password/username');
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <p className='em'><i>{errorMessage}</i></p>
      <input
        className={errorMessage ? 'error' : ''}
        name="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        type="text"
        placeholder="Username"
      />
      <input
        className={errorMessage ? 'error' : ''}
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        placeholder="Password"
      />
      
      <button onClick={handleClick}>Sign In</button>

      <p><i>Don't have an Account? Sign-up <Link to="/sign-up">here!</Link></i></p>
    </div>
  );
};

export default SignIn;
