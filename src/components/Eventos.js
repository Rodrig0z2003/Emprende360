import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebaseConfig/firebase';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import '../styles/Eventos.css';

const MySwal = withReactContent(Swal);

const Eventos = () => {
  const [eventos, setEventos] = useState([]);
  const navigate = useNavigate();

  const eventosCollection = collection(db, "eventos");

  const getEventos = async () => {
    const data = await getDocs(eventosCollection);
    setEventos(data.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
  };

  const deleteEvento = async (id) => {
    const eventoDoc = doc(db, "eventos", id);
    await deleteDoc(eventoDoc);
    getEventos();
  };

  const confirmDelete = (id) => {
    MySwal.fire({
      title: '¿Eliminar el evento?',
      text: "No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        deleteEvento(id);
        Swal.fire(
          'Eliminado!',
          'El evento ha sido eliminado.',
          'success'
        );
      }
    });
  };

  useEffect(() => {
    getEventos();
  }, []);

  const formatHorario = (horario) => {
    if (horario && horario.seconds) {
      return new Date(horario.seconds * 1000).toLocaleString();
    }
    return 'N/A';
  };

  return (
    <div className="eventos-container">
      <h2>Lista de Eventos</h2>
      <button onClick={() => navigate('/create-event')} className="btn btn-primary create-btn">
        <i className="fa fa-plus"></i> Crear Evento
      </button>
      <div className="eventos-grid">
        {eventos.map((evento) => (
          <div className="evento-card" key={evento.id}>
            <img src={evento.imagen} alt={evento.nombre} className="evento-image"/>
            <div className="evento-details">
              <h3>{evento.nombre}</h3>
              <p><strong>Lugar:</strong> {evento.lugar}</p> 
              <p><strong>Aforo:</strong> {evento.aforo}</p>
              <p><strong>Horario:</strong> {formatHorario(evento.horario)}</p>
              <p><strong>Introducción:</strong> {evento.introduccion}</p>
              <p><strong>Descripción:</strong> {evento.descripcion}</p>
              <p><strong>Temas:</strong> {Array.isArray(evento.temas) ? evento.temas.join(', ') : 'N/A'}</p>
              <div className="evento-actions">
                <button onClick={() => navigate(`/edit-event/${evento.id}`)} className="btn btn-edit">
                  <i className="fa fa-pencil"></i> Editar
                </button>
                <button onClick={() => confirmDelete(evento.id)} className="btn btn-danger">
                  <i className="fa fa-trash"></i> Eliminar
                </button>
                <button onClick={() => navigate(`/add-question/${evento.id}`)} className="btn btn-secondary add-question-btn">
                  <i className="fa fa-question-circle"></i> Agregar Pregunta
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Eventos;
