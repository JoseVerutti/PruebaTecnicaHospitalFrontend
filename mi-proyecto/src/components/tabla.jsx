import React, { useState, useEffect } from 'react';
import './tabla.css'; // Asegúrate de que este archivo contenga los estilos deseados

const Tabla = ({popUpEnable, currentDate}) => {
  
  const [datos, setDatos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/pacientes'); // Reemplaza con la URL de tu API
        const result = await response.json();
        
        // Unimos el primer nombre con el primer apellido
        const datosConNombreCompleto = result.slice(0, 15).map(item => ({
          ...item,
          nombreCompleto: `${item.nombre} ${item.apellido1}`
        }));
        
        setDatos(datosConNombreCompleto);
        setLoading(false);
      } catch (error) {
        console.error('Error al obtener los datos:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [popUpEnable]);

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="table-container">
      <table className="custom-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Documento</th>
            <th>Bloque</th>
            <th>Especialidad</th>
            <th>Proceso</th>
            <th>Tiempo</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {datos.map((item, index) => (
            <tr key={index}>
              <td>{item.nombreCompleto}</td>
              <td>{item.documento}</td>
              <td>{item.bloque}</td>
              <td>{item.especialidad}</td>
              <td>{item.proceso}</td>
              <td>{Math.floor((currentDate.getTime()-item.tiempo)/60000)} min</td>
              <td>
                <div 
                className=
                {
                  (Math.floor((currentDate.getTime()-item.tiempo)/60000)<30)?"verde":
                  (Math.floor((currentDate.getTime()-item.tiempo)/60000)<60)?"amarillo":
                  (Math.floor((currentDate.getTime()-item.tiempo)/60000)<90)?"naranja":"rojo"
                }
                ></div>
              </td>


            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Tabla;
