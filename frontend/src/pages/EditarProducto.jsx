import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const EditarProducto = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
  });
  const [image, setImage] = useState(null);
  const [currentImageUrl, setCurrentImageUrl] = useState('');

  useEffect(() => {
    // Cargar producto para editar
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/products/${id}`);
        if (!response.ok) throw new Error('No se encontró el producto');
        const data = await response.json();
        setProduct({
          name: data.name || '',
          description: data.description || '',
          price: data.price || '',
          stock: data.stock || '',
        });
        setCurrentImageUrl(data.imageUrl || '');
      } catch (error) {
        alert(error.message);
        navigate('/productos');
      }
    };
    fetchProduct();
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', product.name);
    formData.append('description', product.description);
    formData.append('price', product.price);
    formData.append('stock', product.stock);
    if (image) {
      formData.append('image', image);
    }

    try {
      const response = await fetch(`http://localhost:4000/api/products/${id}`, {
        method: 'PUT',
        body: formData,
      });

      if (!response.ok) throw new Error('Error al actualizar el producto');

      alert('Producto actualizado correctamente');
      navigate('/productos');
    } catch (error) {
      console.error(error);
      alert('Hubo un error al actualizar el producto');
    }
  };

  return (
    <div className="add-product-form" style={{ maxWidth: '450px', margin: '3rem auto' }}>
      <h2>Editar Producto</h2>
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
          <label>Imagen actual:</label><br />
          {currentImageUrl ? (
            <img
              src={currentImageUrl}
              alt="Imagen actual"
              style={{ width: '120px', height: '120px', objectFit: 'cover', borderRadius: '6px', marginBottom: '0.5rem' }}
            />
          ) : (
            <p>No hay imagen disponible</p>
          )}
        </div>
        <div>
          <label>Cambiar imagen:</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>
        <button type="submit">Guardar Cambios</button>
      </form>
    </div>
  );
};

export default EditarProducto;
