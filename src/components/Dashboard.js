import React, { useState, useEffect } from 'react';
import '../styles/Dashboard.css'; // Importa el estilo del Dashboard
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { db } from '../firebaseConfig/firebase';

const Dashboard = () => {
  const [students, setStudents] = useState([]);
  const [totalStudents, setTotalStudents] = useState(0);
  const [events, setEvents] = useState([]);
  const [coursesCount, setCoursesCount] = useState(0);
  const [cardsCount, setCardsCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const studentsSnapshot = await getDocs(collection(db, 'estudiantes'));
      setTotalStudents(studentsSnapshot.size);
      setStudents(studentsSnapshot.docs.map(doc => doc.data()));

      const eventsSnapshot = await getDocs(collection(db, 'eventos'));
      setEvents(eventsSnapshot.docs.map(doc => doc.data()));

      const coursesSnapshot = await getDocs(collection(db, 'cursos'));
      setCoursesCount(coursesSnapshot.size);

      const cardsSnapshot = await getDocs(collection(db, 'tarjetas'));
      setCardsCount(cardsSnapshot.size);
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="head-title">
        <div className="left">
          <h1>Dashboard</h1>
          <ul className="breadcrumb">
            <li>
              <a href="#">Dashboard</a>
            </li>
            <li><i className='bx bx-chevron-right'></i></li>
            <li>
              <a className="active" href="#">Home</a>
            </li>
          </ul>
        </div>
      </div>

      <ul className="box-info">
        <li>
          <i className='bx bxs-user'></i>
          <span className="text">
            <h3>{totalStudents}</h3>
            <p>Estudiantes</p>
          </span>
        </li>
        <li>
          <i className='bx bxs-calendar'></i>
          <span className="text">
            <h3>{events.length}</h3>
            <p>Eventos</p>
          </span>
        </li>
        <li>
          <i className='bx bxs-book'></i>
          <span className="text">
            <h3>{coursesCount}</h3>
            <p>Cursos</p>
          </span>
        </li>
        <li>
          <i className='bx bxs-credit-card'></i>
          <span className="text">
            <h3>{cardsCount}</h3>
            <p>Tarjetas</p>
          </span>
        </li>
      </ul>

      <div className="table-data">
        <div className="order">
          <div className="head">
            <h3>Estudiantes Recientes</h3>
      
          </div>
          <table>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Carrera</th>
                <th>Semestre</th>
              </tr>
            </thead>
            <tbody>
              {students.slice(0, 5).map((student, index) => (
                <tr key={index}>
                  <td>{student.nombreCompleto}</td>
                  <td>{student.carrera}</td>
                  <td>{student.semestre}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="todo">
          <div className="head">
            <h3>Eventos</h3>
           
          </div>
          <ul className="todo-list">
            {events.slice(0, 5).map((event, index) => (
              <li key={index}>
                <p>{event.nombre}</p>
                
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
