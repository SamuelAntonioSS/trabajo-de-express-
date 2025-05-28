import { useState, useEffect } from "react";
import axios from "axios";
import "./customers.css";

const AgregarCustomer = () => {
  const [customer, setCustomer] = useState({
    name: "",
    lastName: "",
    birthday: "",
    email: "",
    address: "",
    hireDate: "",
    password: "",
    telephone: "",
    dui: "",
    isssNumber: "",
    isVerified: false,
  });

  const [customersList, setCustomersList] = useState([]);

  const fetchCustomers = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/customers");
      setCustomersList(response.data);
    } catch (error) {
      console.error("Error al cargar clientes:", error);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCustomer((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:4000/api/customers", customer);
      alert("Cliente agregado exitosamente");
      setCustomer({
        name: "",
        lastName: "",
        birthday: "",
        email: "",
        address: "",
        hireDate: "",
        password: "",
        telephone: "",
        dui: "",
        isssNumber: "",
        isVerified: false,
      });
      fetchCustomers();
    } catch (error) {
      console.error("Error al agregar cliente:", error);
      alert("Hubo un error al agregar el cliente");
    }
  };

  return (
    <div className="page-container">
      <div className="add-customer-form">
        <h2>Agregar Cliente</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <label>
              Nombre:
              <input type="text" name="name" value={customer.name} onChange={handleChange} required />
            </label>
            <label>
              Apellido:
              <input type="text" name="lastName" value={customer.lastName} onChange={handleChange} required />
            </label>
            <label>
              Fecha de Nacimiento:
              <input type="date" name="birthday" value={customer.birthday} onChange={handleChange} required />
            </label>
            <label>
              Email:
              <input type="email" name="email" value={customer.email} onChange={handleChange} required />
            </label>
            <label>
              Dirección:
              <input type="text" name="address" value={customer.address} onChange={handleChange} required />
            </label>
            <label>
              Fecha de Contratación:
              <input type="date" name="hireDate" value={customer.hireDate} onChange={handleChange} required />
            </label>
            <label>
              Contraseña:
              <input type="password" name="password" value={customer.password} onChange={handleChange} required />
            </label>
            <label>
              Teléfono:
              <input type="tel" name="telephone" value={customer.telephone} onChange={handleChange} required />
            </label>
            <label>
              DUI:
              <input type="text" name="dui" value={customer.dui} onChange={handleChange} required />
            </label>
            <label>
              Número de ISSS:
              <input type="text" name="isssNumber" value={customer.isssNumber} onChange={handleChange} required />
            </label>
            <label className="checkbox-label">
              Verificado:
              <input type="checkbox" name="isVerified" checked={customer.isVerified} onChange={handleChange} />
            </label>
          </div>
          <button type="submit">Agregar Cliente</button>
        </form>
      </div>

      <div className="customer-list">
        <h2>Lista de Clientes</h2>
        <ul>
          {customersList.map((cust) => (
            <li key={cust._id}>
              {cust.name} {cust.lastName} - {cust.email}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AgregarCustomer;
