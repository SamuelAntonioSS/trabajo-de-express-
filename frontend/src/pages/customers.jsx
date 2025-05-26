import { useState } from "react";
import axios from "axios"; // recuerda instalar axios: npm install axios
import "./customers.css"; // si quieres agregar estilos

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
      const response = await axios.post(
        "http://localhost:4000/api/customers", // ajusta la ruta si es diferente
        customer
      );
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
    } catch (error) {
      console.error("Error al agregar cliente:", error);
      alert("Hubo un error al agregar el cliente");
    }
  };

  return (
    <div className="add-customer-form">
      <h2>Agregar Cliente</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Nombre:
          <input
            type="text"
            name="name"
            value={customer.name}
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
            value={customer.lastName}
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
            maxLength={100}
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
            maxLength={100}
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
            maxLength={100}
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
            value={customer.dui}
            onChange={handleChange}
            required
            maxLength={9}
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
        <label>
          Verificado:
          <input
            type="checkbox"
            name="isVerified"
            checked={customer.isVerified}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Agregar Cliente</button>
      </form>
    </div>
  );
};

export default AgregarCustomer;
