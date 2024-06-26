import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebaseConfig/firebase';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import '../styles/Tarjetas.css';

const MySwal = withReactContent(Swal);

const Tarjetas = () => {
  const [tarjetas, setTarjetas] = useState([]);
  const navigate = useNavigate();

  const tarjetasCollection = collection(db, "tarjetas");

  const getTarjetas = async () => {
    const data = await getDocs(tarjetasCollection);
    setTarjetas(data.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
  };

  const deleteTarjeta = async (id) => {
    const tarjetaDoc = doc(db, "tarjetas", id);
    await deleteDoc(tarjetaDoc);
    getTarjetas();
  };

  const confirmDelete = (id) => {
    MySwal.fire({
      title: '¿Eliminar la tarjeta?',
      text: "No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminarla!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        deleteTarjeta(id);
        Swal.fire(
          'Eliminada!',
          'La tarjeta ha sido eliminada.',
          'success'
        );
      }
    });
  };

  useEffect(() => {
    getTarjetas();
  }, []);

  return (
    <div className="tarjetas-container">
      <h2>Lista de Tarjetas</h2>
      <button onClick={() => navigate('/create-tarjeta')} className="btn btn-primary create-btn">
        <i className="fa fa-plus"></i> Crear Tarjeta
      </button>
      <table className="tarjetas-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {tarjetas.map((tarjeta) => (
            <tr key={tarjeta.id}>
              <td>{tarjeta.id}</td>
              <td>{tarjeta.estado ? 'Activo' : 'Inactivo'}</td>
              <td className="actions">
                <button onClick={() => navigate(`/edit-tarjeta/${tarjeta.id}`)} className="btn btn-edit">
                  <i className="fa-solid fa-pencil"></i> Editar
                </button>
                <button onClick={() => confirmDelete(tarjeta.id)} className="btn btn-danger">
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

export default Tarjetas;
