import { useEffect, useState } from 'react';

const ListaProductos = () => {
  const [productos, setProductos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [productoEditando, setProductoEditando] = useState(null);

  const cargarProductos = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/products');
      if (!response.ok) throw new Error('Error al obtener productos');
      const data = await response.json();
      setProductos(data);
    } catch (error) {
      console.error(error);
      alert('Error al cargar productos');
    }
  };

  useEffect(() => {
    cargarProductos();
  }, []);

  const eliminarProducto = async (id) => {
    if (!window.confirm('¿Estás seguro de eliminar este producto?')) return;
    try {
      const response = await fetch(`http://localhost:4000/api/products/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Error al eliminar producto');
      alert('Producto eliminado');
      cargarProductos();
    } catch (error) {
      console.error(error);
      alert('No se pudo eliminar el producto');
    }
  };

  const abrirModalEdicion = (producto) => {
    setProductoEditando(producto);
    setShowModal(true);
  };

  const manejarCambio = (campo, valor) => {
    setProductoEditando({ ...productoEditando, [campo]: valor });
  };

  const guardarCambios = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:4000/api/products/${productoEditando._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productoEditando),
      });
      if (!response.ok) throw new Error('Error al actualizar');
      alert('Producto actualizado');
      setShowModal(false);
      setProductoEditando(null);
      cargarProductos();
    } catch (err) {
      console.error(err);
      alert('Error al actualizar el producto');
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '3rem auto', fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}>
      <h2>Lista de Productos</h2>
      {productos.length === 0 ? (
        <p>No hay productos para mostrar.</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#2563eb', color: 'white' }}>
              <th style={{ padding: '0.5rem', border: '1px solid #ccc' }}>Imagen</th>
              <th style={{ padding: '0.5rem', border: '1px solid #ccc' }}>Nombre</th>
              <th style={{ padding: '0.5rem', border: '1px solid #ccc' }}>Precio</th>
              <th style={{ padding: '0.5rem', border: '1px solid #ccc' }}>Stock</th>
              <th style={{ padding: '0.5rem', border: '1px solid #ccc' }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((prod) => (
              <tr key={prod._id || prod.id} style={{ borderBottom: '1px solid #ddd' }}>
                <td style={{ padding: '0.5rem', textAlign: 'center' }}>
                  {prod.image ? (
                    <img src={prod.image} alt={prod.name} style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '4px' }} />
                  ) : (
                    'Sin imagen'
                  )}
                </td>
                <td style={{ padding: '0.5rem' }}>{prod.name}</td>
                <td style={{ padding: '0.5rem' }}>${prod.price}</td>
                <td style={{ padding: '0.5rem' }}>{prod.stock}</td>
                <td style={{ padding: '0.5rem', display: 'flex', gap: '0.5rem' }}>
                  <button
                    style={{ cursor: 'pointer', padding: '0.3rem 0.6rem', borderRadius: '4px', border: 'none', backgroundColor: '#2563eb', color: 'white' }}
                    onClick={() => abrirModalEdicion(prod)}
                  >
                    Editar
                  </button>
                  <button
                    style={{ cursor: 'pointer', padding: '0.3rem 0.6rem', borderRadius: '4px', border: 'none', backgroundColor: '#dc2626', color: 'white' }}
                    onClick={() => eliminarProducto(prod._id || prod.id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {showModal && productoEditando && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
          backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <div style={{ background: 'white', padding: '2rem', borderRadius: '8px', width: '400px' }}>
            <h3>Editar Producto</h3>
            <form onSubmit={guardarCambios}>
              <div style={{ marginBottom: '1rem' }}>
                <label>Nombre:</label><br />
                <input
                  type="text"
                  value={productoEditando.name}
                  onChange={(e) => manejarCambio('name', e.target.value)}
                  style={{ width: '100%' }}
                  required
                />
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <label>Precio:</label><br />
                <input
                  type="number"
                  value={productoEditando.price}
                  onChange={(e) => manejarCambio('price', e.target.value)}
                  style={{ width: '100%' }}
                  required
                />
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <label>Stock:</label><br />
                <input
                  type="number"
                  value={productoEditando.stock}
                  onChange={(e) => manejarCambio('stock', e.target.value)}
                  style={{ width: '100%' }}
                  required
                />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <button type="submit" style={{ padding: '0.5rem 1rem', backgroundColor: '#16a34a', color: 'white', border: 'none', borderRadius: '4px' }}>
                  Guardar
                </button>
                <button type="button" onClick={() => setShowModal(false)} style={{ padding: '0.5rem 1rem', backgroundColor: '#6b7280', color: 'white', border: 'none', borderRadius: '4px' }}>
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListaProductos;
