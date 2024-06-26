import React, { useState, useEffect } from 'react';
import '../styles/Navbar.css';

const Navbar = () => {
  const [isSidebarHidden, setSidebarHidden] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSidebarHidden(true);
      } else {
        setSidebarHidden(false);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const toggleSidebar = () => {
    setSidebarHidden(!isSidebarHidden);
    document.getElementById('sidebar').classList.toggle('hide');
  };

  return (
    <nav>
      <i className='bx bx-menu' onClick={toggleSidebar}></i>
      <div className="nav-link" style={{flexGrow: 1, textAlign: 'center', fontSize: '20px', fontWeight: 'bold',color:'#6A0DAD'}}>Sistema de Administración</div>
    </nav>
  );
}

export default Navbar;