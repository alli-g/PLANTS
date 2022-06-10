import React from 'react';
import { auth, provider } from '../firebase-config';
import { signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
function Login({ setIsAuth }) {
  let navigate = useNavigate();

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider).then((result) => {
      localStorage.setItem('isAuth', true);
      setIsAuth(true);
      navigate('/yourplants');
    });
  };
  return (
    <div>
      <p className="login-header">
        Sign-in with Google if you care about your plants
      </p>
      <Button
      id="login-button"
        className="btn-primary btn-lg btn-block btn-secondary"
        onClick={signInWithGoogle}
      >
        Sign In with Google
      </Button>
    </div>
  );
}

export default Login;
