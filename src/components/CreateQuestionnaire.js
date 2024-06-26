import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { collection, addDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig/firebase';
import Swal from 'sweetalert2';
import '../styles/CreateQuestionnaire.css';

const CreateQuestionnaire = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    id_cuestionario: id || '',
    id_pregunta: '',
    alternativa1: '',
    alternativa2: '',
    alternativa3: '',
    respuesta: '',
    pregunta: '',
  });

  useEffect(() => {
    if (!id) {
      const generatedId = Math.random().toString(36).substring(2, 15);
      setFormData((prevData) => ({ ...prevData, id_cuestionario: generatedId }));
    }
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const cuestionariosCollection = collection(db, 'cuestionarios');

    // Añadir el documento a la colección de cuestionarios
    await addDoc(cuestionariosCollection, {
      id_cuestionario: formData.id_cuestionario,
      id_pregunta: formData.id_pregunta,
      opciones: {
        alternativa1: formData.alternativa1,
        alternativa2: formData.alternativa2,
        alternativa3: formData.alternativa3,
      },
      respuesta: formData.respuesta,
      pregunta: formData.pregunta,
    });

    const eventoDocRef = doc(db, 'eventos', id); // Suponiendo que 'id' es el ID del documento en 'eventos'

    // Actualizar el documento en la colección de eventos
    await updateDoc(eventoDocRef, {
      id_cuestionario: formData.id_cuestionario,
    });

    Swal.fire({
      title: 'Pregunta Creada',
      text: 'La pregunta ha sido creada correctamente.',
      icon: 'success',
      confirmButtonText: 'OK',
    }).then(() => {
      navigate(`/view-questions/${id}`);
    });
  };

  return (
    <div className="create-questionnaire">
      <h2>Agregar Pregunta</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Pregunta</label>
          <input
            type="text"
            name="pregunta"
            value={formData.pregunta}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Alternativa 1</label>
          <input
            type="text"
            name="alternativa1"
            value={formData.alternativa1}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Alternativa 2</label>
          <input
            type="text"
            name="alternativa2"
            value={formData.alternativa2}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Alternativa 3</label>
          <input
            type="text"
            name="alternativa3"
            value={formData.alternativa3}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Respuesta</label>
          <input
            type="text"
            name="respuesta"
            value={formData.respuesta}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>ID Pregunta</label>
          <input
            type="text"
            name="id_pregunta"
            value={formData.id_pregunta}
            onChange={handleChange}
            required
          />
        </div>
        <div className="button-group">
          <button type="submit" className="btn btn-primary">
            <i className="fa fa-plus"></i> Crear
          </button>
          <button type="button" className="btn btn-secondary" onClick={() => navigate(`/view-questions/${id}`)}>
            <i className="fa fa-eye"></i> Ver Preguntas
          </button>
          <button type="button" className="btn btn-secondary" onClick={() => navigate('/eventos')}>
            <i className="fa fa-times"></i> Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateQuestionnaire;
