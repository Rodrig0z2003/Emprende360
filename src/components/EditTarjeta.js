import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getDoc, updateDoc, doc } from "firebase/firestore";
import { db } from '../firebaseConfig/firebase';
import Swal from 'sweetalert2';
import '../styles/EditTarjeta.css';

const EditTarjeta = () => {
  const [estado, setEstado] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const update = async (e) => {
    e.preventDefault();
    const tarjetaDoc = doc(db, "tarjetas", id);
    const data = {
      estado
    };
    await updateDoc(tarjetaDoc, data);
    Swal.fire({
      title: 'Tarjeta Actualizada',
      text: 'La tarjeta ha sido actualizada correctamente.',
      icon: 'success',
      confirmButtonText: 'OK'
    }).then(() => {
      navigate('/tarjetas');
    });
  };

  const getTarjetaById = async (id) => {
    const tarjetaDoc = await getDoc(doc(db, "tarjetas", id));
    if (tarjetaDoc.exists()) {
      const tarjetaData = tarjetaDoc.data();
      setEstado(tarjetaData.estado);
    } else {
      console.log('La tarjeta no existe');
    }
  };

  useEffect(() => {
    getTarjetaById(id);
  }, [id]);

  return (
    <div className='edit-tarjeta'>
      <h2>Editar Tarjeta</h2>
      <form onSubmit={update}>
        <div className='form-group'>
          <label>Estado</label>
          <select
            value={estado}
            onChange={(e) => setEstado(e.target.value === 'true')}
            required
          >
            <option value="true">Activo</option>
            <option value="false">Inactivo</option>
          </select>
        </div>
        <div className="button-group">
          <button type='submit' className='btn btn-primary'><i className="fa fa-check"></i> Actualizar</button>
          <button type='button' className='btn btn-secondary' onClick={() => navigate('/tarjetas')}><i className="fa fa-times"></i> Cancelar</button>
        </div>
      </form>
    </div>
  );
};

export default EditTarjeta;
