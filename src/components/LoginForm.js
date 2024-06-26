import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const predefinedUsername = 'admin';
    const predefinedPassword = 'Arequipa2024';

    if (username === predefinedUsername && password === predefinedPassword) {
      navigate('/'); // Redirige al usuario al dashboard después de un inicio de sesión exitoso
    } else {
      alert('Usuario o contraseña incorrectos');
    }
  };

  return (
    <form action="#" className="sign-in-form" onSubmit={handleSubmit}>
      <h2 className="title">Inciar Sesión</h2>
      <div className="input-field">
        <i className="fas fa-user"></i>
        <input type="text" placeholder="Usuario" value={username} onChange={(e) => setUsername(e.target.value)} />
      </div>
      <div className="input-field">
        <i className="fas fa-lock"></i>
        <input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <input type="submit" value="Login" className="btn solid" />
    </form>
  );
};

export default LoginForm;