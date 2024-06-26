import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Sidebar.css';

const Sidebar = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const allSideMenu = document.querySelectorAll('#sidebar .side-menu.top li a');

    allSideMenu.forEach((item, index) => {
      item.addEventListener('click', () => {
        setActiveIndex(index);
      });
    });

    return () => {
      allSideMenu.forEach((item) => {
        item.removeEventListener('click', () => {});
      });
    };
  }, []);

  const handleNavigation = (index, path) => {
    setActiveIndex(index);
    navigate(path);
  };

  return (
    <section id="sidebar">
      <a href="#" className="brand">
        <img src="/img/logo.svg" alt="Logo" className="logo-img" />
        <span className="text">Emprende360</span>
      </a>
      <ul className="side-menu top">
        <li className={activeIndex === 0 ? "active" : ""}>
          <a href="#" onClick={() => handleNavigation(0, "/")}>
            <i className='bx bxs-dashboard'></i>
            <span className="text">Dashboard</span>
          </a>
        </li>
        <li className={activeIndex === 1 ? "active" : ""}>
          <a href="#" onClick={() => handleNavigation(1, "/students")}>
            <i className='bx bxs-user'></i>
            <span className="text">Estudiantes</span>
          </a>
        </li>
        <li className={activeIndex === 2 ? "active" : ""}>
          <a href="#" onClick={() => handleNavigation(2, "/tarjetas")}>
            <i className='bx bxs-credit-card'></i>
            <span className="text">Tarjetas</span>
          </a>
        </li>
        <li className={activeIndex === 3 ? "active" : ""}>
          <a href="#" onClick={() => handleNavigation(3, "/eventos")}>
            <i className='bx bxs-calendar-event'></i>
            <span className="text">Eventos</span>
          </a>
        </li>
        <li className={activeIndex === 4 ? "active" : ""}>
          <a href="#" onClick={() => handleNavigation(4, "/cursos")}>
            <i className='bx bxs-book'></i>
            <span className="text">Cursos</span>
          </a>
        </li>
      </ul>
      <ul className="side-menu">
        <li>  
          <a href="/login" className="logout">
            <i className='bx bxs-log-out-circle'></i>
            <span className="text">Cerrar Sesión</span>
          </a>
        </li>
      </ul>
    </section>
  );
};

export default Sidebar;
