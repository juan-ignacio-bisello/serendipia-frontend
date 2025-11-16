import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { serendipiaApi } from '../../api';

export const ProductEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // 

  const [formValues, setFormValues] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    category: '',
    images: [],
  });

  const [imageFiles, setImageFiles] = useState([]);

  // Cargar el producto al iniciar el componente
  useEffect(() => {
    
    const fetchProduct = async () => {
      try {
        const { data } = await serendipiaApi.get(`/clothes/${id}`);
        setFormValues({
          name: data.name,
          description: data.description,
          price: data.price,
          stock: data.stock,
          category: data.category,
          images: data.images || [], 
        });
      } catch (error) {
        console.error('Error al cargar el producto', error);
        Swal.fire('Error', 'No se pudo cargar el producto', 'error');
      }
    };

    fetchProduct();
  }, [id]);

  // Manejar cambios en los campos del formulario
  const handleChange = ({ target }) => {

    // Si el campo es de tipo archivo, actualizar el estado de imageFiles
    if (target.type === 'file') {
      setImageFiles(Array.from(target.files));
    } else {
      setFormValues({
        ...formValues,
        [target.name]: target.value,
      });
    }
  };


  const handleSubmit = async (event) => {
    // Manejar el envío del formulario
    event.preventDefault();

    // Validar que se hayan seleccionado imágenes
    try {
      const formData = new FormData();
      formData.append('name', formValues.name);
      formData.append('description', formValues.description);
      formData.append('price', formValues.price);
      formData.append('stock', formValues.stock);
      formData.append('category', formValues.category);
      formData.append('size', 'L');

      imageFiles.forEach((file) => {
        formData.append('images', file);
      });

      const response = await serendipiaApi.put(`/clothes/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      Swal.fire('Éxito', 'Producto actualizado correctamente', 'success');
      navigate('/product/admin');
    } catch (error) {
      console.error('Error al actualizar el producto', error);
      Swal.fire('Error', 'No se pudo actualizar el producto', 'error');
    }
  };

  // Validar que el formulario esté completo antes de enviar
  const isFormValid = () => {
    return (
      formValues.name &&
      formValues.description &&
      formValues.price &&
      formValues.stock &&
      formValues.category
    );
  };

  const handleHome = () => {
    navigate('/');
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow-xl shadow-Pink mt-10 space-y-4">
        <h2 className="text-2xl font-semibold mb-4 text-White">Editar Producto</h2>

        <input
          type="text"
          name="name"
          placeholder="Nombre"
          className="w-full border p-2 rounded text-Gray"
          value={formValues.name}
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Descripción"
          className="w-full border p-2 rounded text-Gray"
          value={formValues.description}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="price"
          placeholder="Precio"
          className="w-full border p-2 rounded text-Gray"
          value={formValues.price}
          onChange={handleChange}
          required
        />

        <div className="flex gap-2">
          {formValues.images.length > 0 ? (
            formValues.images.map((img, i) => (
              <img
                key={img.public_id || i}
                src={img.url}
                alt={`Imagen ${i + 1}`}
                className="w-16 h-16 object-cover rounded"
              />
            ))
          ) : (
            <p className="text-sm text-gray-500">No hay imágenes</p>
          )}
        </div>


        <input
          type="file"
          name="images"
          multiple
          className="w-full border p-2 rounded text-Gray"
          onChange={handleChange}
        />

        <input
          type="number"
          name="stock"
          placeholder="Stock"
          className="w-full border p-2 rounded text-Gray"
          value={formValues.stock}
          onChange={handleChange}
          required
        />

        <select
          name="category"
          className="w-full border p-2 rounded text-Gray"
          value={formValues.category}
          onChange={handleChange}
          required
        >
          <option value="" disabled>Categoría</option>
          <option value="Pantalones">Pantalones</option>
          <option value="Remeras">Remeras</option>
          <option value="Buzos">Buzos</option>
        </select>

        <button
          type="submit"
          className="w-full py-2 rounded bg-Pink text-white hover:bg-Pink-dark"
          disabled={!isFormValid()}
        >
          Actualizar Producto
        </button>
      </form>

      <div className="max-w-xl mx-auto bg-white p-6 rounded-xl mt-10 space-y-4">
        <button
          className="flex px-4 py-2 w-full justify-center text-sm bg-Black text-Gray shadow shadow-Pink hover:shadow-lg hover:shadow-Pink"
          onClick={handleHome}
        >
          Home
        </button>
      </div>
    </>
  );
};
