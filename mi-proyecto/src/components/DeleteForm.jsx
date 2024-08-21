import React, { useState } from "react";
import "./form.css";

function DeleteForm({ onSubmit }) {
  const [documento, setDocumento] = useState("");

  const handleChange = (event) => {
    setDocumento(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch(`http://localhost:8000/pacientes/${documento}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      console.log("Documento eliminado:", documento);
      onSubmit();
    } else {
      console.error("Error al eliminar el documento:", response.statusText);
    }
  };

  return (
    <div className="form">
      <h2>Eliminar Registro</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Documento:
          <input
            type="text"
            name="documento"
            value={documento}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <div className="divButtons">
          <button type="submit" className="button-40">Enviar</button>
          <button onClick={onSubmit} type="button" className="button-40">Cancelar</button>
        </div>
      </form>
    </div>
  );
}

export default DeleteForm;
