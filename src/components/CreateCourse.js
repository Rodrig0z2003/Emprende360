import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig/firebase';
import Swal from 'sweetalert2';
import '../styles/CreateCourse.css';

const CreateCourse = () => {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [duracion, setDuracion] = useState('');
  const [horario, setHorario] = useState('');
  const [introduccion, setIntroduccion] = useState('');
  const [precio, setPrecio] = useState('');
  const [imagen, setImagen] = useState('');
  const [cierreInscripciones, setCierreInscripciones] = useState('');
  const [inicioClases, setInicioClases] = useState('');
  const navigate = useNavigate();

  const store = async (e) => {
    e.preventDefault();

    await addDoc(collection(db, 'cursos'), {
      nombre,
      descripcion,
      duración: Number(duracion),
      horario: new Date(horario),
      introduccion,
      precio: Number(precio),
      imagen,
      inscripciones: {
        'Cierre de Inscripciones': new Date(cierreInscripciones),
        'Inicio de Clases': new Date(inicioClases),
      }
    });

    Swal.fire({
      title: 'Curso Creado',
      text: 'El curso ha sido creado correctamente.',
      icon: 'success',
      confirmButtonText: 'OK',
    }).then(() => {
      navigate('/cursos#');
    });
  };

  const handleCancel = () => {
    navigate('/cursos#');
  };

  return (
    <div className="create-course">
      <h2>Crear Nuevo Curso</h2>
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
          <label>Descripción</label>
          <textarea
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Duración (horas)</label>
          <input
            type="number"
            value={duracion}
            onChange={(e) => setDuracion(e.target.value)}
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
          <label>Precio</label>
          <input
            type="number"
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
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
        <div className="form-group">
          <label>Cierre de Inscripciones</label>
          <input
            type="datetime-local"
            value={cierreInscripciones}
            onChange={(e) => setCierreInscripciones(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Inicio de Clases</label>
          <input
            type="datetime-local"
            value={inicioClases}
            onChange={(e) => setInicioClases(e.target.value)}
            required
          />
        </div>
        <div className="button-group">
          <button type="submit" className="btn btn-primary">
            <i className="fa fa-check"></i> Crear
          </button>
          <button type="button" className="btn btn-secondary" onClick={handleCancel}>
            <i className="fa fa-times"></i> Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateCourse;
