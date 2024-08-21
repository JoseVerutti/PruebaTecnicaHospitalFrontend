import React, { useState, useEffect } from 'react';
import './tabla.css'; // Asegúrate de que este archivo contenga los estilos deseados

const Tabla = ({ popUpEnable,popUpEnable2,popUpEnable3 ,currentDate }) => {
  const [datos, setDatos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [startIndex, setStartIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/pacientes');
        const result = await response.json();
        
        const datosConNombreCompleto = result.map(item => ({
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
  }, [popUpEnable, popUpEnable2, popUpEnable3]);

  useEffect(() => {
    const interval = setInterval(() => {
      setStartIndex(prevIndex => {
        const newIndex = (prevIndex + 15) % datos.length;
        return newIndex;
      });
    }, 20000); 

    return () => clearInterval(interval); 
  }, [datos]);

  if (loading) {
    return <div>Cargando...</div>;
  }

  const datosParaMostrar = datos.slice(startIndex, startIndex + 15);
  if (startIndex + 15 > datos.length) {
    const faltantes = (startIndex + 15) - datos.length;
    datosParaMostrar.push(...datos.slice(0, faltantes));
  }

  const handlePrev = () => {
    setStartIndex(prevIndex => {
      const newIndex = (prevIndex - 15 + datos.length) % datos.length;
      return newIndex;
    });
  };

  const handleNext = () => {
    setStartIndex(prevIndex => {
      const newIndex = (prevIndex + 15) % datos.length;
      return newIndex;
    });
  };

  return (
    <div className="table-container">
      <button className="nav-button" onClick={handlePrev}>{"<"}</button>
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
          {datosParaMostrar.map((item, index) => (
            <tr key={index}>
              <td>{item.nombreCompleto}</td>
              <td className='celdaDocumento'>{item.documento}</td>
              <td>{item.bloque}</td>
              <td>{item.especialidad}</td>
              <td>{item.proceso}</td>
              <td>{Math.floor((currentDate.getTime() - item.tiempo) / 60000)} min</td>
              <td>
                <div
                  className={
                    (Math.floor((currentDate.getTime() - item.tiempo) / 60000) < 30) ? "verde" :
                    (Math.floor((currentDate.getTime() - item.tiempo) / 60000) < 60) ? "amarillo" :
                    (Math.floor((currentDate.getTime() - item.tiempo) / 60000) < 90) ? "naranja" : "rojo"
                  }
                ></div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="nav-button" onClick={handleNext}>{">"}</button>
    </div>
  );
};

export default Tabla;
