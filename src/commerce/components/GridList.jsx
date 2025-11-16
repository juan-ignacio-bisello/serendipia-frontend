import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { increment, setSelectedProduct } from '../../store';
import { useProductStore, useUiStore } from '../../hooks';

export const GridList = () => {

  const { clothes, startLoadingProducts } = useProductStore();
  const dispatch = useDispatch();
  const { toggleItemModal } = useUiStore();

  useEffect(() => {
    startLoadingProducts();
  }, []);

  const onAddToCart = () => {
    dispatch( increment() );
  };

  const handlerSelectedProduct = ( product ) => {
    dispatch( setSelectedProduct( product ) );
    toggleItemModal();
  }

  if (!Array.isArray(clothes)) {
    return <div>Error: los productos no son válidos</div>;
  }

  if (clothes.length === 0) {
    return <div className="text-center py-6">Cargando productos...</div>;
  }

  return (
    <div className="max-w-screen-xl mx-auto grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 p-4">
      { clothes.map((product, index) => (
        <div
          key={product._id || index}
          className="inline-block  sm:w-64 sm:min-h-96 bg-white rounded-xl p-4 flex-shrink-0 shadow-lg shadow-Pink justify-center items-center"
        >
          <img
            className=' object-cover h-52 w-40 sm:h-80 sm:w-56 justify-center items-center '
            key={product._id || index}
            alt={ product.name || `Producto ${index + 1}` }
            src={ product.images?.[0]?.url || `https://via.placeholder.com/250x150?text=Producto+${index + 1}` }
            onClick={ () => handlerSelectedProduct( product ) }
          />
          

          <h3 className="text-lg font-semibold">{product.name || `Producto ${index + 1}`}</h3>
          <p className="text-gray-600">${product.price || `9${index}`}</p>
          <button 
            className="mt-2 w-full bg-lime-500 text-white py-2 rounded-md hover:bg-lime-600"
            onClick={ onAddToCart }  
          >
            Agregar al carrito
          </button>
        </div>
      ))}
    </div>
  );
};
