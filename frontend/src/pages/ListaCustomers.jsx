import { useEffect, useState } from "react";
import axios from "axios";

const ListaCustomers = () => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:4000/api/customers") // ajusta si la ruta es distinta
      .then(res => setCustomers(res.data))
      .catch(err => console.error("Error al cargar clientes:", err));
  }, []);

  return (
    <div>
      <h2>Lista de Clientes</h2>
      <ul>
        {customers.map((cust) => (
          <li key={cust._id}>
            {cust.name} {cust.lastName} - {cust.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListaCustomers;
