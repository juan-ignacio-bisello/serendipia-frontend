import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProductStore } from '../../hooks';
import { useState } from 'react';

export const ProductList = () => {
  
  // Custom hook to access product store
  const { clothes, startLoadingProducts, startDeletingProduct } = useProductStore();
  const navigate = useNavigate();

  const [ refresh, setRefresh ] = useState(false);

  useEffect(() => {
    startLoadingProducts();
  }, [refresh]);

  if (!Array.isArray(clothes)) {
    return <div>Error: los productos no son válidos</div>;
  }

  if (clothes.length === 0) {
    return <div className="text-center py-6">Cargando productos...</div>;
  }

  const handleEdit = (id) => {
    navigate(`/product/admin/edit/${id}`);
  };

  const handleDelete = async(id) => {
    await startDeletingProduct(id);
    setRefresh( prev => !prev );
  };


  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Lista de Productos</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="px-4 py-2">Imagen</th>
              <th className="px-4 py-2">Nombre</th>
              <th className="px-4 py-2">Precio</th>
              <th className="px-4 py-2">Stock</th>
              <th className="px-4 py-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {clothes.map((product) => (
              <tr 
                key={product._id}  
                className="border-t hover:bg-gray-50"
              >
                <td className="px-4 py-2">
                  <img
                    src={product.images?.[0]?.url || `https://via.placeholder.com/250x150?text=Producto+${index + 1}`}
                    alt={product.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                </td>
                <td className="px-4 py-2">{product.name}</td>
                <td className="px-4 py-2">${product.price}</td>
                <td className="px-4 py-2">{product.stock}</td>
                <td className="px-4 py-2 space-x-2">
                  <button
                    onClick={() => handleEdit(product._id)}
                    className="bg-blue-500 min-w-20 text-white px-3 py-1 rounded hover:bg-blue-600"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="bg-red-500 min-w-20 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
