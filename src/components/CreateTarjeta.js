import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig/firebase';
import Swal from 'sweetalert2';
import '../styles/CreateTarjeta.css';

const CreateTarjeta = () => {
  const [id, setId] = useState('');
  const [estado, setEstado] = useState(false);
  const navigate = useNavigate();

  const store = async (e) => {
    e.preventDefault();
    await setDoc(doc(db, "tarjetas", id), {
      estado
    });
    Swal.fire({
      title: 'Tarjeta Creada',
      text: 'La tarjeta ha sido creada correctamente.',
      icon: 'success',
      confirmButtonText: 'OK'
    }).then(() => {
      navigate('/tarjetas');
    });
  };

  return (
    <div className='create-tarjeta'>
      <h2>Crear Nueva Tarjeta</h2>
      <form onSubmit={store}>
        <div className='form-group'>
          <label>ID</label>
          <input
            value={id}
            onChange={(e) => setId(e.target.value)}
            type="text"
            required
          />
        </div>
        <div className='form-group'>
          <label>Estado</label>
          <select
            value={estado}
            onChange={(e) => setEstado(e.target.value === 'true')}
            required
          >
            <option value="true">Activo</option>
            <option value="false">Inactivo</option>
          </select>
        </div>
        <button type='submit' className='btn btn-primary'><i className="fa fa-plus"></i> Crear</button>
      </form>
    </div>
  );
};

export default CreateTarjeta;
