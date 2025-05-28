import { useState } from 'react';
import "./products.css"

const AgregarProduct = () => {
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:4000/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      });

      if (!response.ok) {
        throw new Error('Error al agregar el producto');
      }

      const data = await response.json();
      console.log('Producto agregado:', data);
      alert('Producto agregado exitosamente');
      setProduct({ name: '', description: '', price: '', stock: '' });
    } catch (error) {
      console.error('Error al agregar producto:', error);
      alert('Hubo un error al agregar el producto');
    }
  };

  return (
    <div className="add-product-form">
      <h2>Agregar Producto</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre:</label>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Descripción:</label>
          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
          ></textarea>
        </div>
        <div>
          <label>Precio:</label>
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            required
            min="0"
          />
        </div>
        <div>
          <label>Stock:</label>
          <input
            type="number"
            name="stock"
            value={product.stock}
            onChange={handleChange}
            required
            min="0"
          />
        </div>
        <button type="submit">Agregar Producto</button>
      </form>
    </div>
  );
};

export default AgregarProduct;
