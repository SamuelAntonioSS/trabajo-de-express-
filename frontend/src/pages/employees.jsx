import { useState } from "react";
import axios from "axios"; // recuerda instalar axios: npm install axios
import { useNavigate } from "react-router-dom";
import "./employees.css"; // si quieres agregar estilos, opcional

const AgregarEmployee = () => {
    const navigate = useNavigate();

  const [employee, setEmployee] = useState({

    
    name: "",
    lastName: "",
    birthday: "",
    email: "",
    password: "",
    telephone: "",
    dui: "",
    isVerified: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEmployee((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:4000/api/employees", // ajusta la ruta si es diferente
        employee
      );
      alert("Empleado agregado exitosamente");
      setEmployee({
        name: "",
        lastName: "",
        birthday: "",
        email: "",
        password: "",
        telephone: "",
        dui: "",
        isVerified: false,
      });
    } catch (error) {
      console.error("Error al agregar empleado:", error);
      alert("Hubo un error al agregar el empleado");
    }
  };

  return (
    <div className="add-employee-form">
      <h2>Agregar Empleado</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Nombre:
          <input
            type="text"
            name="name"
            value={employee.name}
            onChange={handleChange}
            required
            maxLength={100}
          />
        </label>
        <label>
          Apellido:
          <input
            type="text"
            name="lastName"
            value={employee.lastName}
            onChange={handleChange}
            required
            maxLength={100}
          />
        </label>
        <label>
          Fecha de Nacimiento:
          <input
            type="date"
            name="birthday"
            value={employee.birthday}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={employee.email}
            onChange={handleChange}
            required
            maxLength={100}
          />
        </label>
        <label>
          Contraseña:
          <input
            type="password"
            name="password"
            value={employee.password}
            onChange={handleChange}
            required
            maxLength={100}
          />
        </label>
        <label>
          Teléfono:
          <input
            type="tel"
            name="telephone"
            value={employee.telephone}
            onChange={handleChange}
            required
            maxLength={8}
            pattern="\d{8}"
            title="Debe contener 8 números"
          />
        </label>
        <label>
          DUI:
          <input
            type="text"
            name="dui"
            value={employee.dui}
            onChange={handleChange}
            required
            maxLength={10}
          />
        </label>
        <label>
          Verificado:
          <input
            type="checkbox"
            name="isVerified"
            checked={employee.isVerified}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Agregar Empleado</button>
      </form>
      <button
  type="button"
  className="view-employees-btn"
  onClick={() => navigate("/verempleados")}
>
  Ver Empleados
</button>
    </div>
  );
};

export default AgregarEmployee;
