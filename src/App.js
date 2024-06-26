import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Main from './components/Main';
import StudentsTable from './components/StudentsTable';
import EditStudent from './components/EditStudent';
import Tarjetas from './components/Tarjetas';
import CreateTarjeta from './components/CreateTarjeta';
import EditTarjeta from './components/EditTarjeta';
import Eventos from './components/Eventos';
import CreateEvent from './components/CreateEvent';
import EditEvent from './components/EditEvent';
import CreateQuestionnaire from './components/CreateQuestionnaire';
import ViewQuestions from './components/ViewQuestions';
import Courses from './components/Courses';
import EditCourse from './components/EditCourse';
import CreateCourse from './components/CreateCourse';
import AuthContainer from './components/AuthContainer';

import './styles/Sidebar.css';
import './styles/Navbar.css';
import './styles/Main.css';
import './styles/Dashboard.css';
import './styles/StudentsTable.css';
import './styles/EditStudent.css';
import './styles/Tarjetas.css';
import './styles/CreateTarjeta.css';
import './styles/EditTarjeta.css';
import './styles/Eventos.css';
import './styles/CreateEvent.css';
import './styles/EditEvent.css';
import './styles/CreateQuestionnaire.css';
import './styles/ViewQuestions.css';
import './styles/Courses.css';
import './styles/EditCourse.css';
import './styles/CreateCourse.css';
import './styles/Auth.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<AuthContainer />} />
        <Route path="/*" element={<MainLayout />} />
        <Route path="*" element={<Navigate to="/login" />} /> {/* Redirect all unknown paths to login */}
      </Routes>
    </Router>
  );
}

const MainLayout = () => {
  return (
    <div className="App">
      <Sidebar />
      <div id="content">
        <Navbar />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/students" element={<StudentsTable />} />
          <Route path="/edit/:id" element={<EditStudent />} />
          <Route path="/tarjetas" element={<Tarjetas />} />
          <Route path="/create-tarjeta" element={<CreateTarjeta />} />
          <Route path="/edit-tarjeta/:id" element={<EditTarjeta />} />
          <Route path="/eventos" element={<Eventos />} />
          <Route path="/create-event" element={<CreateEvent />} />
          <Route path="/edit-event/:id" element={<EditEvent />} />
          <Route path="/add-question/:id" element={<CreateQuestionnaire />} />
          <Route path="/view-questions/:id" element={<ViewQuestions />} />
          <Route path="/cursos" element={<Courses />} />
          <Route path="/edit-course/:id" element={<EditCourse />} />
          <Route path="/create-course" element={<CreateCourse />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
