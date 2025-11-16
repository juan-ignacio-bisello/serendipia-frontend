import { useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { useUiStore } from '../../hooks';
import { increment } from '../../store';

export const ProductModal = () => {
  const dispatch = useDispatch();
  const { ClearModal, isItemModalOpen, selectedProduct } = useUiStore();

  const closeModal = () => {
    ClearModal();
  };

  const onAddToCart = () => {
    dispatch( increment() );
    closeModal();
  };

  return (
    <AnimatePresence>
      { isItemModalOpen && selectedProduct && (
        <motion.div
          className="fixed inset-0 bg-Black bg-opacity-50 z-50 flex justify-center items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-Black w-11/12 md:w-2/3 lg:w-1/2 rounded-lg p-6 shadow-lg shadow-Pink relative"
            initial={{ y: "-100vh", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100vh", opacity: 0 }}
            transition={{ type: 'spring', stiffness: 120 }}
          >
            <button
              className="absolute w-10 h-10 top-2 right-2 text-gray-700 hover:text-red-500 items-center justify-center text-2xl"
              onClick={closeModal}
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-4">{selectedProduct.name}</h2>
            <img
              src={selectedProduct.images?.[0]?.url}
              alt={selectedProduct.name}
              className="object-cover place-self-center w-72 h-96 justify-center items-center"
            />
            <div>
              <p className="text-gray-700 mb-2">{selectedProduct.description}</p>
              <p className="text-gray-800 mb-2">Precio: ${selectedProduct.price}</p>
              <p className="text-gray-600">Stock: {selectedProduct.stock}</p>
              <p className="text-gray-600">Categoría: {selectedProduct.category}</p>
            </div>
            
            <button
              onClick={ onAddToCart }
              className='mt-2 w-3/4 bg-lime-500 text-white py-2 rounded-md hover:bg-lime-600'
            >
              Agregar al carro
            </button>


          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
