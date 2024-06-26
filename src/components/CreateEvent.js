import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig/firebase';
import Swal from 'sweetalert2';
import '../styles/CreateEvent.css';

const CreateEvent = () => {
  const [nombre, setNombre] = useState('');
  const [lugar, setLugar] = useState(''); 
  const [aforo, setAforo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [horario, setHorario] = useState('');
  const [imagen, setImagen] = useState('');
  const [introduccion, setIntroduccion] = useState('');
  const [temas, setTemas] = useState('');
  const navigate = useNavigate();

  const store = async (e) => {
    e.preventDefault();

    const selectedDate = new Date(horario);
    selectedDate.setHours(0, 0, 0, 0);

    // Verificar si ya existe un evento en la misma fecha
    const eventosCollection = collection(db, 'eventos');
    const q = query(eventosCollection, where('horario', '>=', selectedDate), where('horario', '<', new Date(selectedDate.getTime() + 86400000))); // 86400000 ms en un día
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      Swal.fire({
        title: 'Error',
        text: 'Ya existe un evento programado para esta fecha.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
      return;
    }

    // Si no hay evento en la misma fecha, crea el nuevo evento
    await addDoc(eventosCollection, {
      nombre,
      lugar, 
      aforo: Number(aforo),
      descripcion,
      horario: selectedDate,
      imagen,
      introduccion,
      temas: temas.split(',').map((tema) => tema.trim()),
    });

    Swal.fire({
      title: 'Evento Creado',
      text: 'El evento ha sido creado correctamente.',
      icon: 'success',
      confirmButtonText: 'OK',
    }).then(() => {
      navigate('/eventos');
    });
  };

  return (
    <div className="create-event">
      <h2>Crear Nuevo Evento</h2>
      <form onSubmit={store}>
        <div className="form-group">
          <label>Nombre</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Lugar</label>
          <input
            type="text"
            value={lugar}
            onChange={(e) => setLugar(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Aforo</label>
          <input
            type="number"
            value={aforo}
            onChange={(e) => setAforo(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Descripción</label>
          <textarea
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Horario</label>
          <input
            type="datetime-local"
            value={horario}
            onChange={(e) => setHorario(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Introducción</label>
          <textarea
            value={introduccion}
            onChange={(e) => setIntroduccion(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Temas</label>
          <input
            type="text"
            value={temas}
            onChange={(e) => setTemas(e.target.value)}
            placeholder="Separar los temas por comas"
            required
          />
        </div>
        <div className="form-group">
          <label>Imagen (URL)</label>
          <input
            type="text"
            value={imagen}
            onChange={(e) => setImagen(e.target.value)}
            required
          />
        </div>
        <div className="button-group">
          <button type="submit" className="btn btn-primary">
            <i className="fa fa-plus"></i> Crear
          </button>
          <button type="button" className="btn btn-secondary" onClick={() => navigate('/eventos')}>
            <i className="fa fa-times"></i> Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateEvent;
