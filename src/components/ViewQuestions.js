import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebaseConfig/firebase';
import '../styles/ViewQuestions.css';

const ViewQuestions = () => {
  const { id } = useParams();
  const [questions, setQuestions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getQuestions = async () => {
      const q = query(collection(db, 'cuestionarios'), where('id_cuestionario', '==', id));
      const querySnapshot = await getDocs(q);
      const questionsData = querySnapshot.docs.map(doc => doc.data());
      setQuestions(questionsData);
    };

    getQuestions();
  }, [id]);

  return (
    <div className="view-questions">
      <h2>Preguntas del Evento</h2>
      <button className="btn btn-secondary" onClick={() => navigate('/eventos')}>
        <i className="fa fa-arrow-left"></i> Regresar a Eventos
      </button>
      <div className="questions-list">
        {questions.length > 0 ? (
          questions.map((question, index) => (
            <div key={index} className="question-card">
              <h3>{question.pregunta}</h3>
              <p><strong>Alternativa 1:</strong> {question.opciones.alternativa1}</p>
              <p><strong>Alternativa 2:</strong> {question.opciones.alternativa2}</p>
              <p><strong>Alternativa 3:</strong> {question.opciones.alternativa3}</p>
              <p><strong>Respuesta:</strong> {question.respuesta}</p>
            </div>
          ))
        ) : (
          <p>No hay preguntas para este evento.</p>
        )}
      </div>
    </div>
  );
};

export default ViewQuestions;
