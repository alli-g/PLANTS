import React from 'react';
import { auth, provider } from '../firebase-config';
import { signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button'
function Login({ setIsAuth }) {
  let navigate = useNavigate();

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider).then((result) => {
      localStorage.setItem('isAuth', true);
      setIsAuth(true);
      navigate('/');
    });
  };
  return (
    <div className="loginPage">
      <p>Sign-in with Google if you care about your plants</p>
      <Button className="login-with-google-btn" onClick={signInWithGoogle}>
        Sign In with Google
      </Button>
    </div>
  );
}

export default Login;
