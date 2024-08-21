import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Tabla from './components/tabla';
import logo from './logo.png'; // Asegúrate de tener el logo en la carpeta src
import Form from './components/form';

const App = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [popUpEnable, setPopUpEnable]= useState(false);

  const onSubmit = () =>{
    setPopUpEnable(false)
  }

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
      <div className='tableContainer'>
        <header className="app-header">
          <h1>SEGUIMIENTO DE ATENCIÓN MEDICA</h1>
          <div className="header-right">
            <div className='date'>{formatDate(currentDate)}</div>
            <div className='time'>{formatTime(currentDate)}</div>
            <img src={logo} alt="Logo" className="logo" />
          </div>
        </header>
        <Tabla popUpEnable={popUpEnable} currentDate={currentDate}/>
      </div>

      <div className='buttonDiv'>
        <button onClick={()=>{setPopUpEnable(true)}} className='button-40'>Añadir</button>

          {popUpEnable?
          <Form onSubmit={onSubmit}/>:
          <div></div>}
      </div>
    </div>
  );
};

export default App;
