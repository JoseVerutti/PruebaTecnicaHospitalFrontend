import React, { useState, useEffect } from 'react';
import './tabla.css'; // Asegúrate de que este archivo contenga los estilos deseados

const Tabla = ({ popUpEnable, popUpEnable2, popUpEnable3, currentDate }) => {
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

  const getStatusColor = (tiempo) => {
    const elapsedMillis = currentDate.getTime() - tiempo;
    const elapsedSeconds = Math.floor(elapsedMillis / 1000);
    const hours = Math.floor(elapsedSeconds / 3600);
    const minutes = Math.floor((elapsedSeconds % 3600) / 60);
    const seconds = elapsedSeconds % 60;

    const formattedTime = `${hours}h ${minutes}m ${seconds}s`;

    return (
      elapsedMillis < 10 * 60000 ? "verde1" :
      elapsedMillis < 20 * 60000 ? "verde2" :
      elapsedMillis < 30 * 60000 ? "verde3" :
      elapsedMillis < 40 * 60000 ? "amarillo1" :
      elapsedMillis < 50 * 60000 ? "amarillo2" :
      elapsedMillis < 60 * 60000 ? "amarillo3" :
      elapsedMillis < 70 * 60000 ? "naranja1" :
      elapsedMillis < 80 * 60000 ? "naranja2" :
      elapsedMillis < 90 * 60000 ? "naranja3" : "rojo"
    );
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
              <td>
                {(() => {
                  const elapsedMillis = currentDate.getTime() - item.tiempo;
                  const elapsedSeconds = Math.floor(elapsedMillis / 1000);
                  const hours = Math.floor(elapsedSeconds / 3600);
                  const minutes = Math.floor((elapsedSeconds % 3600) / 60);
                  const seconds = elapsedSeconds % 60;

                  return `${hours}h ${minutes}m ${seconds}s`;
                })()}
              </td>
              <td>
                <div
                  className={getStatusColor(item.tiempo)}
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
