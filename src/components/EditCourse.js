import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getDoc, updateDoc, doc } from 'firebase/firestore';
import { db } from '../firebaseConfig/firebase';
import Swal from 'sweetalert2';
import '../styles/EditCourse.css';

const EditCourse = () => {
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
  const { id } = useParams();

  const getCourseById = async (id) => {
    const courseDoc = await getDoc(doc(db, 'cursos', id));
    if (courseDoc.exists()) {
      const courseData = courseDoc.data();
      setNombre(courseData.nombre);
      setDescripcion(courseData.descripcion);
      setDuracion(String(courseData.duración)); // Convertimos a string para que coincida con el input type="number"
      setHorario(new Date(courseData.horario.seconds * 1000).toISOString().slice(0, 16));
      setIntroduccion(courseData.introduccion);
      setPrecio(String(courseData.precio)); // Convertimos a string para que coincida con el input type="number"
      setImagen(courseData.imagen);
      setCierreInscripciones(new Date(courseData.inscripciones['Cierre de Inscripciones'].seconds * 1000).toISOString().slice(0, 16));
      setInicioClases(new Date(courseData.inscripciones['Inicio de Clases'].seconds * 1000).toISOString().slice(0, 16));
    } else {
      console.log('El curso no existe');
    }
  };

  useEffect(() => {
    getCourseById(id);
  }, [id]);

  const updateCourse = async (e) => {
    e.preventDefault();
    const courseDoc = doc(db, 'cursos', id);
    const data = {
      nombre,
      descripcion,
      duración: Number(duracion), // Convertimos a número para almacenar en Firestore
      horario: new Date(horario),
      introduccion,
      precio: Number(precio), // Convertimos a número para almacenar en Firestore
      imagen,
      inscripciones: {
        'Cierre de Inscripciones': new Date(cierreInscripciones),
        'Inicio de Clases': new Date(inicioClases),
      },
    };
    await updateDoc(courseDoc, data);
    Swal.fire({
      title: 'Curso Actualizado',
      text: 'El curso ha sido actualizado correctamente.',
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
    <div className="edit-course">
      <h2>Editar Curso</h2>
      <form onSubmit={updateCourse}>
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
            <i className="fa fa-check"></i> Actualizar
          </button>
          <button type="button" className="btn btn-secondary" onClick={handleCancel}>
            <i className="fa fa-times"></i> Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditCourse;
