import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebaseConfig/firebase';
import Swal from 'sweetalert2';
import '../styles/Courses.css';

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();
  const coursesCollection = collection(db, 'cursos');

  const getCourses = async () => {
    const data = await getDocs(coursesCollection);
    setCourses(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  const deleteCourse = async (id) => {
    const courseDoc = doc(db, 'cursos', id);
    await deleteDoc(courseDoc);
    getCourses();
  };

  const confirmDelete = (id) => {
    Swal.fire({
      title: '¿Eliminar el curso?',
      text: "No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
        deleteCourse(id);
        Swal.fire(
          'Eliminado!',
          'El curso ha sido eliminado.',
          'success'
        );
      }
    });
  };

  useEffect(() => {
    getCourses();
  }, []);

  const formatHorario = (horario) => {
    if (horario && horario.seconds) {
      return new Date(horario.seconds * 1000).toLocaleString();
    }
    return 'No especificado';
  };

  return (
    <div className="content">
      <div className="courses-wrapper">
        <h2>Lista de Cursos</h2>
        <button onClick={() => navigate('/create-course')} className="btn btn-primary create-btn">
          <i className="fa fa-plus"></i> Crear Curso
        </button>
        <div className="courses-list">
          {courses.map((course) => (
            <div key={course.id} className="course-card">
              {course.imagen && <img src={course.imagen} alt={course.nombre} className="course-image" />}
              <div className="course-details">
                <div className="course-header">
                  <h3>{course.nombre}</h3>
                  <p className="course-price">s/.{course.precio}</p>
                </div>
                <div className="course-body">
                  <p><strong>Descripción:</strong> {course.descripcion}</p>
                  <p><strong>Duración:</strong> {course.duración} horas</p>
                  <p><strong>Horario:</strong> {formatHorario(course.horario)}</p>
                  <p><strong>Introducción:</strong> {course.introduccion}</p>
                </div>
                {course.inscripciones && (
                  <div className="course-inscriptions">
                    <p><strong>Cierre de Inscripciones:</strong> {course.inscripciones['Cierre de Inscripciones'] ? new Date(course.inscripciones['Cierre de Inscripciones'].seconds * 1000).toLocaleDateString() : 'No especificado'}</p>
                    <p><strong>Inicio de Clases:</strong> {course.inscripciones['Inicio de Clases'] ? new Date(course.inscripciones['Inicio de Clases'].seconds * 1000).toLocaleDateString() : 'No especificado'}</p>
                  </div>
                )}
                {!course.inscripciones && <p>No hay información de inscripciones disponible</p>}
                <div className="course-actions">
                  <button onClick={() => navigate(`/edit-course/${course.id}`)} className="btn btn-edit">
                    <i className="fa fa-pencil"></i> Editar
                  </button>
                  <button onClick={() => confirmDelete(course.id)} className="btn btn-danger">
                    <i className="fa fa-trash"></i> Eliminar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Courses;
