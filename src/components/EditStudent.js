import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getDoc, updateDoc, doc } from "firebase/firestore";
import { db } from "../firebaseConfig/firebase";
import Swal from "sweetalert2";
import "../styles/EditStudent.css";

const EditStudent = () => {
    const [nombreCompleto, setNombreCompleto] = useState('');
    const [carrera, setCarrera] = useState('');
    const [codigoEstudiante, setCodigoEstudiante] = useState('');
    const [correo, setCorreo] = useState('');
    const [seccion, setSeccion] = useState('');
    const [semestre, setSemestre] = useState('');
    const [codigoAcceso, setCodigoAcceso] = useState('');

    const navigate = useNavigate();
    const { id } = useParams();

    const update = async (e) => {
        e.preventDefault();
        const studentDoc = doc(db, "estudiantes", id);
        const data = {
            nombreCompleto,
            carrera,
            codigoEstudiante,
            correo,
            seccion,
            semestre,
            codigoAcceso
        };
        await updateDoc(studentDoc, data);
        Swal.fire({
            title: 'Estudiante Actualizado',
            text: 'El estudiante ha sido actualizado correctamente.',
            icon: 'success',
            confirmButtonText: 'OK'
        }).then(() => {
            navigate('/students');
        });
    };

    const getStudentById = async (id) => {
        const studentDoc = await getDoc(doc(db, "estudiantes", id));
        if (studentDoc.exists()) {
            const studentData = studentDoc.data();
            setNombreCompleto(studentData.nombreCompleto);
            setCarrera(studentData.carrera);
            setCodigoEstudiante(studentData.codigoEstudiante);
            setCorreo(studentData.correo);
            setSeccion(studentData.seccion);
            setSemestre(studentData.semestre);
            setCodigoAcceso(studentData.codigoAcceso);
        } else {
            console.log('El estudiante no existe');
        }
    };

    useEffect(() => {
        getStudentById(id);
    }, [id]);

    return (
        <div className='edit-student'>
            <h2>Editar Estudiante</h2>
            <form onSubmit={update}>
                <div className='form-group'>
                    <label>Nombre Completo</label>
                    <input
                        value={nombreCompleto}
                        onChange={(e) => setNombreCompleto(e.target.value)}
                        type="text"
                        required
                    />
                </div>
                <div className='form-group'>
                    <label>Carrera</label>
                    <input
                        value={carrera}
                        onChange={(e) => setCarrera(e.target.value)}
                        type="text"
                        required
                    />
                </div>
                <div className='form-group'>
                    <label>Código de Estudiante</label>
                    <input
                        value={codigoEstudiante}
                        onChange={(e) => setCodigoEstudiante(e.target.value)}
                        type="text"
                        required
                    />
                </div>
                <div className='form-group'>
                    <label>Correo</label>
                    <input
                        value={correo}
                        onChange={(e) => setCorreo(e.target.value)}
                        type="email"
                        required
                    />
                </div>
                <div className='form-group'>
                    <label>Sección</label>
                    <input
                        value={seccion}
                        onChange={(e) => setSeccion(e.target.value)}
                        type="text"
                        required
                    />
                </div>
                <div className='form-group'>
                    <label>Semestre</label>
                    <input
                        value={semestre}
                        onChange={(e) => setSemestre(e.target.value)}
                        type="text"
                        required
                    />
                </div>
                <div className='form-group'>
                    <label>Código de Acceso</label>
                    <input
                        value={codigoAcceso}
                        onChange={(e) => setCodigoAcceso(e.target.value)}
                        type="text"
                        required
                    />
                </div>
                <div className="button-group">
                    <button type='submit' className='btn btn-primary'><i className="fa fa-check"></i> Actualizar</button>
                    <button type='button' className='btn btn-secondary' onClick={() => navigate('/students')}><i className="fa fa-times"></i> Cancelar</button>
                </div>
            </form>
        </div>
    );
};

export default EditStudent;
