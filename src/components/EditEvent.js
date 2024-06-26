import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getDoc, updateDoc, doc } from 'firebase/firestore';
import { db } from '../firebaseConfig/firebase';
import Swal from 'sweetalert2';
import '../styles/EditEvent.css';

const EditEvent = () => {
  const [nombre, setNombre] = useState('');
  const [lugar, setLugar] = useState(''); 
  const [aforo, setAforo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [horario, setHorario] = useState('');
  const [imagen, setImagen] = useState('');
  const [introduccion, setIntroduccion] = useState('');
  const [temas, setTemas] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();

  const getEventById = async (id) => {
    const eventDoc = await getDoc(doc(db, "eventos", id));
    if (eventDoc.exists()) {
      const eventData = eventDoc.data();
      setNombre(eventData.nombre);
      setLugar(eventData.lugar); 
      setAforo(eventData.aforo);
      setDescripcion(eventData.descripcion);
      setHorario(new Date(eventData.horario.seconds * 1000).toISOString().slice(0, 16));
      setImagen(eventData.imagen);
      setIntroduccion(eventData.introduccion);
      setTemas(Array.isArray(eventData.temas) ? eventData.temas.join(', ') : '');
    } else {
      console.log('El evento no existe');
    }
  };

  useEffect(() => {
    getEventById(id);
  }, [id]);

  const updateEvent = async (e) => {
    e.preventDefault();
    const eventDoc = doc(db, "eventos", id);
    const data = {
      nombre,
      lugar, // Cambiado a lugar con minúscula
      aforo: Number(aforo),
      descripcion,
      horario: new Date(horario),
      imagen,
      introduccion,
      temas: temas.split(',').map((tema) => tema.trim()),
    };
    await updateDoc(eventDoc, data);
    Swal.fire({
      title: 'Evento Actualizado',
      text: 'El evento ha sido actualizado correctamente.',
      icon: 'success',
      confirmButtonText: 'OK',
    }).then(() => {
      navigate('/eventos');
    });
  };

  return (
    <div className="edit-event">
      <h2>Editar Evento</h2>
      <form onSubmit={updateEvent}>
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
            <i className="fa fa-check"></i> Actualizar
          </button>
          <button type="button" className="btn btn-secondary" onClick={() => navigate('/eventos')}>
            <i className="fa fa-times"></i> Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditEvent;
