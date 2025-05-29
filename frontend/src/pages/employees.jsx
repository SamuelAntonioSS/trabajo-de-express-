import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./employees.css";

const AgregarEmployee = () => {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const [editingId, setEditingId] = useState(null);

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

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const res = await fetch("http://localhost:4000/api/employees");
      const data = await res.json();
      setEmployees(data);
    } catch (err) {
      console.error("Error al cargar empleados:", err);
    }
  };

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
      const method = editingId ? "PUT" : "POST";
      const url = editingId
        ? `http://localhost:4000/api/employees/${editingId}`
        : "http://localhost:4000/api/employees";

      const res = await fetch(url, {
        method,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(employee),
      });

      if (!res.ok) throw new Error("Error en la operación");

      alert(editingId ? "Empleado actualizado" : "Empleado agregado");
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
      setEditingId(null);
      fetchEmployees();
    } catch (err) {
      console.error("Error al guardar empleado:", err);
      alert("Error al guardar");
    }
  };

  const handleEdit = (emp) => {
    setEmployee(emp);
    setEditingId(emp._id);
  };

  const handleDelete = async (id) => {
    if (!confirm("¿Estás seguro de eliminar este empleado?")) return;
    try {
      const res = await fetch(`http://localhost:4000/api/employees/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Error al eliminar");
      alert("Empleado eliminado");
      fetchEmployees();
    } catch (err) {
      console.error(err);
      alert("No se pudo eliminar");
    }
  };

  return (
    <div className="container-employees">
      <div className="add-employee-form">
        <h2>{editingId ? "Editar Empleado" : "Agregar Empleado"}</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Nombre:
            <input type="text" name="name" value={employee.name} onChange={handleChange} required />
          </label>
          <label>
            Apellido:
            <input type="text" name="lastName" value={employee.lastName} onChange={handleChange} required />
          </label>
          <label>
            Fecha de Nacimiento:
            <input type="date" name="birthday" value={employee.birthday} onChange={handleChange} required />
          </label>
          <label>
            Email:
            <input type="email" name="email" value={employee.email} onChange={handleChange} required />
          </label>
          <label>
            Contraseña:
            <input type="password" name="password" value={employee.password} onChange={handleChange} required />
          </label>
          <label>
            Teléfono:
            <input type="tel" name="telephone" value={employee.telephone} onChange={handleChange} required />
          </label>
          <label>
            DUI:
            <input type="text" name="dui" value={employee.dui} onChange={handleChange} required />
          </label>
          <label>
            Verificado:
            <input type="checkbox" name="isVerified" checked={employee.isVerified} onChange={handleChange} />
          </label>
          <button type="submit">{editingId ? "Actualizar" : "Agregar"} Empleado</button>
        </form>
      </div>

      <div className="employees-table-container">
        <h3>Lista de Empleados</h3>
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Email</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp) => (
              <tr key={emp._id}>
                <td>{emp.name} {emp.lastName}</td>
                <td>{emp.email}</td>
                <td>
                  <button onClick={() => handleEdit(emp)}>✏️</button>
                  <button onClick={() => handleDelete(emp._id)}>🗑️</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AgregarEmployee;
