import React from 'react';
import { auth, provider } from '../firebase';

import { Button } from '@material-ui/core';
import './Login.css';

const Login = () => {

  const signIn = () => {
    auth.signInWithPopup(provider).catch((error) => alert(error.message));
  }

  return (
    <div className="login">
      <div className="login__telegram">
        <img 
          src="https://telegram.org/img/t_logo.svg?1" 
          alt="Logo Telegram"
        />
        <h1>Telegram</h1>
      </div>
      <Button onClick={signIn} >Sign In</Button>
    </div>
  );
};

export default Login;
