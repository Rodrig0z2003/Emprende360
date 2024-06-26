import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebaseConfig/firebase';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import '../styles/StudentsTable.css';

const MySwal = withReactContent(Swal);

const StudentsTable = () => {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const studentsCollection = collection(db, "estudiantes");

  const getStudents = async () => {
    const data = await getDocs(studentsCollection);
    setStudents(
      data.docs.map((doc, index) => ({ ...doc.data(), id: doc.id, autoId: index + 1 }))
    );
  };

  const deleteStudent = async (id) => {
    const studentDoc = doc(db, "estudiantes", id);
    await deleteDoc(studentDoc);
    getStudents();
  };

  const confirmDelete = (id) => {
    MySwal.fire({
      title: '¿Eliminar el estudiante?',
      text: "No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminarlo!'
    }).then((result) => {
      if (result.isConfirmed) {
        deleteStudent(id);
        Swal.fire(
          'Eliminado!',
          'El estudiante ha sido eliminado.',
          'success'
        );
      }
    });
  };

  useEffect(() => {
    getStudents();
  }, []);

  return (
    <div className="students-table-container">
      <h2>Lista de Estudiantes</h2>
      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Buscar estudiante..."
          onChange={(event) => {
            setSearchTerm(event.target.value);
          }}
        />
      <i className="fa fa-search search-icon"></i>
      </div>
      <table className="students-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre Completo</th>
            <th>Carrera</th>
            <th>Sección</th>
            <th>Semestre</th>
            <th>Correo</th>
            <th>Código de Estudiante</th>
            <th>Código de Acceso</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {students.filter((val) => {
            if (searchTerm === "") {
              return val;
            } else if (
              val.nombreCompleto.toLowerCase().includes(searchTerm.toLowerCase())
            ) {
              return val;
            }
          }).map((student, index) => (
            <tr key={student.id}>
              <td>{index + 1}</td>
              <td>{student.nombreCompleto}</td>
              <td>{student.carrera}</td>
              <td>{student.seccion}</td>
              <td>{student.semestre}</td>
              <td>{student.correo}</td>
              <td>{student.codigoEstudiante}</td>
              <td>{student.codigoAcceso}</td>
              <td className="actions">
                <button onClick={() => navigate(`/edit/${student.id}`)} className="btn btn-edit">
                  <i className="fa-solid fa-pencil"></i> Editar
                </button>
                <button onClick={() => confirmDelete(student.id)} className="btn btn-danger">
                  <i className="fa-solid fa-trash"></i> Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentsTable;
