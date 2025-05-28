import { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
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

  // Fetch customers from the API
  const fetchCustomers = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/customers");
      if (!response.ok) {
        throw new Error("Error al cargar los clientes");
      }
      const data = await response.json(); // Convertir la respuesta a JSON
      setCustomersList(data);
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

  const handleDuiChange = (e) => {
    let value = e.target.value;

    // Eliminar todo lo que no sea número
    value = value.replace(/\D/g, "");

    // Si tiene más de 8 caracteres, colocar el guion después del octavo
    if (value.length > 8) {
      value = value.slice(0, 8) + '-' + value.slice(8, 9); // Coloca el guion después de los primeros 8 números
    }

    // Limitar la longitud a 9 caracteres (8 números + el guion)
    if (value.length > 10) {
      value = value.slice(0, 10); // Evita que el valor sea mayor a 10 caracteres
    }

    setCustomer((prev) => ({
      ...prev,
      dui: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const method = customer._id ? "PUT" : "POST"; // Si hay _id, es actualización
      const url = customer._id
        ? `http://localhost:4000/api/customers/${customer._id}`
        : "http://localhost:4000/api/customers";
      
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(customer), // Convertir el cliente a JSON
      });

      if (!response.ok) {
        throw new Error("Error al agregar o editar cliente");
      }

      alert("Cliente procesado exitosamente");
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
      console.error("Error al agregar o editar cliente:", error);
      alert("Hubo un error");
    }
  };

  const handleEdit = (cust) => {
    setCustomer({
      ...cust,
    });
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar este cliente?");
    if (confirmDelete) {
      try {
        const response = await fetch(`http://localhost:4000/api/customers/${id}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          throw new Error("Error al eliminar cliente");
        }

        alert("Cliente eliminado exitosamente");
        fetchCustomers(); // Refrescar la lista después de eliminar
      } catch (error) {
        console.error("Error al eliminar cliente:", error);
        alert("Hubo un error al eliminar el cliente");
      }
    }
  };

  return (
    <div className="page-container">
      <div className="add-customer-form">
        <h2>{customer._id ? "Editar Cliente" : "Agregar Cliente"}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <label>
              Nombre:
              <input
                type="text"
                name="name"
                value={customer.name}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Apellido:
              <input
                type="text"
                name="lastName"
                value={customer.lastName}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Fecha de Nacimiento:
              <input
                type="date"
                name="birthday"
                value={customer.birthday}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Email:
              <input
                type="email"
                name="email"
                value={customer.email}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Dirección:
              <input
                type="text"
                name="address"
                value={customer.address}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Fecha de Contratación:
              <input
                type="date"
                name="hireDate"
                value={customer.hireDate}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Contraseña:
              <input
                type="password"
                name="password"
                value={customer.password}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Teléfono:
              <input
                type="tel"
                name="telephone"
                value={customer.telephone}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              DUI:
              <input
                type="text"
                name="dui"
                value={customer.dui}
                onChange={handleDuiChange}
                maxLength={10}
                required
              />
            </label>
            <label>
              Número de ISSS:
              <input
                type="text"
                name="isssNumber"
                value={customer.isssNumber}
                onChange={handleChange}
                required
              />
            </label>
            <label className="checkbox-label">
              Verificado:
              <input
                type="checkbox"
                name="isVerified"
                checked={customer.isVerified}
                onChange={handleChange}
              />
            </label>
          </div>
          <button type="submit">
            {customer._id ? "Actualizar Cliente" : "Agregar Cliente"}
          </button>
        </form>
      </div>

      <div className="customer-list">
        <h2>Lista de Clientes</h2>
        <ul>
          {customersList.map((cust) => (
            <li key={cust._id}>
              <div className="customer-info">
                {cust.name} {cust.lastName} - {cust.email}
              </div>
              <div className="customer-actions">
                <button onClick={() => handleEdit(cust)}>
                  <FontAwesomeIcon icon={faEdit} />
                </button>
                <button onClick={() => handleDelete(cust._id)}>
                  <FontAwesomeIcon icon={faTrashAlt} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AgregarCustomer;
