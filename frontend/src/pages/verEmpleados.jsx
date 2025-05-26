import { useEffect, useState } from "react";
import axios from "axios";
import "./VerEmpleados.css";

const VerEmpleados = () => {
  const [empleados, setEmpleados] = useState([]);

  useEffect(() => {
    const fetchEmpleados = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/employees");
        setEmpleados(response.data);
      } catch (error) {
        console.error("Error al obtener empleados:", error);
      }
    };

    fetchEmpleados();
  }, []);

  return (
    <div className="ver-empleados">
      <h2>Lista de Empleados</h2>
      {empleados.length === 0 ? (
        <p>No hay empleados registrados.</p>
      ) : (
        <table className="empleados-table">
          <thead>
            <tr>
              <th>Nombre Completo</th>
              <th>Email</th>
              <th>Teléfono</th>
              <th>DUI</th>
              <th>Fecha de Nacimiento</th>
            </tr>
          </thead>
          <tbody>
            {empleados.map((emp) => (
              <tr key={emp._id}>
                <td>{emp.name} {emp.lastName}</td>
                <td>{emp.email}</td>
                <td>{emp.telephone}</td>
                <td>{emp.dui}</td>
                <td>{emp.birthday}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default VerEmpleados;
