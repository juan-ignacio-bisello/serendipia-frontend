import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import serendipiaApi from '../../api/SerendipaApi';
import Swal from 'sweetalert2';

export const ProductForm = () => {

  const navigate = useNavigate();

    const [imageFiles, setImageFiles] = useState( null );
    const [formValues, setFormValues] = useState({
        name: '',
        description: '',
        price: '',
        imageUrl: '',
        stock: '',
        category: ''
      });


    const handleChange = ({ target }) => {
      if (target.type === 'file') {
        setImageFiles( Array.from(target.files) );
      } else {
        setFormValues({
          ...formValues,
          [target.name]: target.value,
        });
      }
    };
    

    const handleSubmit = async (event) => {
      event.preventDefault();
    
      try {
        // Crear un objeto FormData para enviar los datos del formulario
        const formData = new FormData();

        formData.append('name', formValues.name);
        formData.append('description', formValues.description);
        formData.append('price', formValues.price);
        formData.append('stock', formValues.stock);
        formData.append('category', formValues.category);
        formData.append('size', 'L');

        imageFiles.forEach( ( file ) => {
          formData.append('images', file);
        });
      

        const response = await serendipiaApi.post('/clothes', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${localStorage.getItem('token')}`, // si usás JWT
          },
        });
      
        console.log('Producto subido:', response.data);
      
        Swal.fire( 'Éxito', 'Producto subido correctamente', 'success' );

        navigate('/product/admin');

      } catch (error) {
        console.error('Error al subir el producto', error);
        Swal.fire( 'Error', 'No se pudo subir el producto', 'error' );
      }
    };

    const isFormValid = () => {
      return (
        formValues.name &&
        formValues.description &&
        formValues.price &&
        formValues.stock &&
        formValues.category &&
        (imageFiles || formValues.imageUrl)
      );
    };

    const handleHome = () => {
      navigate('/');
    };

  return (
    <>
      <form onSubmit={handleSubmit} className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow-xl shadow-Pink mt-10 space-y-4">
        <h2 className="text-2xl font-semibold mb-4 text-White">Agregar un nuevo Producto</h2>

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
          placeholder="Categoría"
          className="w-full border p-2 rounded text-Gray"
          value={formValues.category}
          onChange={handleChange}
          required
        >
          <option value="" disabled >Categoría</option>
          <option value="Pantalones">Pantalones</option>
          <option value="Remeras">Remeras</option>
          <option value="Buzos">Buzos</option>
        </select>

        <button
          type="submit"
          className="w-full py-2 rounded"
          disabled={ !isFormValid() }
        >
          Subir Producto
        </button>
      </form>

      <div className="max-w-xl mx-auto bg-white p-6 rounded-xl mt-10 space-y-4">
        <button 
          className="flex px-4 py-2 w-full justify-center text-sm bg-Black text-Gray shadow shadow-Pink hover:shadow-lg hover:shadow-Pink"
          onClick={ handleHome }>
          Home
        </button>
      </div>
    </>
    
  )
}
