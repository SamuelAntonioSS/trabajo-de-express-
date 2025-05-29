import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Nav from './components/Nav'
import AgregarProduct from "./pages/products";
import AgregarEmployee from "./pages/employees";
import AgregarCustomer from "./pages/customers";
import VerEmpleados from "./pages/verEmpleados";
import ListaCustomers from "./pages/ListaCustomers";
import ListaProductos from "./pages/ListaProductos";

import './App.css'

function App() {

  return (
    <>
    <Router >
      <Nav/>
      <Routes>
        <Route path="agregarproduct" element={<AgregarProduct />} />
        <Route path="agregaremployee" element={<AgregarEmployee />} />
        <Route path="agregarcustomer" element={<AgregarCustomer />} />
        <Route path="verempleados" element={<VerEmpleados />} />
        <Route path="listacustomers" element={<ListaCustomers/>} />
        <Route path="listaproductos" element={<ListaProductos />} />




      </Routes>
      
      </Router>     
    </>
  )
}

export default App;
