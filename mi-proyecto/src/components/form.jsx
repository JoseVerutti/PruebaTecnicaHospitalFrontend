import React, { useState, useEffect } from "react";
import "./form.css"

function Form({ onSubmit }) {
  const [formData, setFormData] = useState({
    nombre: "",
    nombre2: "",
    apellido1: "",
    apellido2: "",
    documento: "",
    bloque: "",
    especialidad: "",
    proceso: "",
    tiempo: "",
  });

  const [especialidades, setEspecialidades] = useState([]);
  const [procesos, setProcesos] = useState([]);

  useEffect(() => {
    // Configura la hora actual al montar el componente
    const currentDate = new Date();
    setFormData((prevData) => ({
      ...prevData,
      tiempo: currentDate.getTime()
    }));

    // Simular carga de especialidades desde una API o archivo
    setEspecialidades([
      "Medicina Interna",
      "Cirugía General",
      "Ginecología",
      "Pediatría",
      "Traumatología",
      "Oftalmología",
      "Otorrinolaringología",
      "Cardiología"
    ]);
  }, []);

  useEffect(() => {
    // Actualiza la lista de procesos en función de la especialidad seleccionada
    const procesosPorEspecialidad = {
      "Medicina Interna": ["Consulta General", "Examen Físico"],
      "Cirugía General": ["Cirugía Electiva", "Cirugía de Emergencia"],
      "Ginecología": ["Examen Ginecológico", "Control Prenatal"],
      "Pediatría": ["Consulta Pediátrica", "Vacunación"],
      "Traumatología": ["Consulta de Traumatología", "Tratamiento de Fracturas"],
      "Oftalmología": ["Consulta Oftalmológica", "Exámenes de Vista"],
      "Otorrinolaringología": ["Consulta ORL", "Tratamiento de Afecciones Nasales"],
      "Cardiología": ["Consulta Cardiológica", "Electrocardiograma"]
    };

    setProcesos(procesosPorEspecialidad[formData.especialidad] || []);
  }, [formData.especialidad]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch('http://localhost:8000/pacientes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    onSubmit();
    console.log("Formulario enviado:", formData);
  };

  return (
    <div className="form">
      <h2>Formulario de Registro</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Nombre:
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Nombre 2:
          <input
            type="text"
            name="nombre2"
            value={formData.nombre2}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Apellido 1:
          <input
            type="text"
            name="apellido1"
            value={formData.apellido1}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Apellido 2:
          <input
            type="text"
            name="apellido2"
            value={formData.apellido2}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Documento:
          <input
            type="text"
            name="documento"
            value={formData.documento}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Bloque:
          <select
            name="bloque"
            value={formData.bloque}
            onChange={handleChange}
            required
          >
            <option value="">Seleccione un Bloque</option>
            {['A', 'B', 'C', 'D', 'E', 'F', 'G'].map(b => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>
        </label>
        <br />
        <label>
          Especialidad:
          <select
            name="especialidad"
            value={formData.especialidad}
            onChange={handleChange}
            required
          >
            <option value="">Seleccione una Especialidad</option>
            {especialidades.map(e => (
              <option key={e} value={e}>{e}</option>
            ))}
          </select>
        </label>
        <br />
        <label>
          Proceso:
          <select
            name="proceso"
            value={formData.proceso}
            onChange={handleChange}
            required
          >
            <option value="">Seleccione un Proceso</option>
            {procesos.map(p => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
        </label>
        <br />
        <div className="divButtons">
            <button type="submit" className="button-40">Enviar</button>
            <button onClick={onSubmit} className="button-40">Cancelar</button>
        </div>
      </form>
    </div>
  );
}

export default Form;
