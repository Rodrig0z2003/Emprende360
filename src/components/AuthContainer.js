import React from 'react';
import LoginForm from './LoginForm';
import '../styles/Auth.css';

const AuthContainer = () => {
  return (
    <div className="container">
      <div className="forms-container">
        <div className="signin-signup">
          <LoginForm />
        </div>
      </div>
      <div className="panels-container">
        <div className="panel left-panel">
          <div className="content">
            <h3>Bienvenido a Emprende360</h3>
            <p>Su herramienta definitiva para gestionar todos los aspectos de sus eventos de manera eficiente y organizada.</p>
          </div>
          <img src="/img/log.svg" className="image" alt="" />
        </div>
        <div className="panel right-panel">
          <div className="content">
            <h3>One of us ?</h3>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum laboriosam ad deleniti.</p>
            <button className="btn transparent">
              Sign in
            </button>
          </div>
          <img src="/img/register.svg" className="image" alt="" />
        </div>
      </div>
    </div>
  );
};

export default AuthContainer;