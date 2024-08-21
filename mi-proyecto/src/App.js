import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Tabla from './tabla';
import logo from './logo.jpg'; // Asegúrate de tener el logo en la carpeta src

const App = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000); // Actualiza cada segundo

    return () => clearInterval(timer); // Limpia el intervalo al desmontar el componente
  }, []);

  const formatDate = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString(undefined, options);
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString();
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>SEGUIMIENTO DE ATENCIÓN MEDICA</h1>
        <div className="header-right">
          <img src={logo} alt="Logo" className="logo" />
          <div className="date-time">
            <div>{formatDate(currentDate)}</div>
            <div>{formatTime(currentDate)}</div>
          </div>
        </div>
      </header>
      <Tabla />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));

export default App;
