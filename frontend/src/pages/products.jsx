import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import './products.css';

const AgregarProduct = () => {
      const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
  });

  const [image, setImage] = useState(null); // Estado para la imagen

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]); // Guardamos el archivo
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', product.name);
    formData.append('description', product.description);
    formData.append('price', product.price);
    formData.append('stock', product.stock);
    if (image) {
      formData.append('image', image); // Añadimos la imagen al FormData
    }

    try {
      const response = await fetch('http://localhost:4000/api/products', {
        method: 'POST',
        body: formData, // Enviamos FormData, no JSON
      });

      if (!response.ok) throw new Error('Error al agregar el producto');

      const data = await response.json();
      console.log('Producto agregado:', data);
      alert('Producto agregado exitosamente');
      setProduct({ name: '', description: '', price: '', stock: '' });
      setImage(null);
    } catch (error) {
      console.error('Error al agregar producto:', error);
      alert('Hubo un error al agregar el producto');
    }
  };

  return (
    <div className="add-product-form">
      <h2>Agregar Producto</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
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
        <div>
          <label>Imagen:</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
          
        </div>
        
        <button type="submit">Agregar Producto</button>
      </form>

       {/* Botón para ir a la lista */}
      <button
        style={{ marginTop: '1rem', width: '100%', backgroundColor: '#eb2550', color: 'white', fontWeight: '700', padding: '0.75rem', borderRadius: '8px', cursor: 'pointer', border: 'none' }}
        onClick={() => navigate('/listaproductos')}
      >
        Ver Lista de Productos
      </button>
    </div>
  );
};

export default AgregarProduct;
