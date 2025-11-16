import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuthStore, useProductStore, useUiStore } from '../../hooks';


export const SideBar = () => {
  const navigate = useNavigate();

  const { startLoadingProducts, startLoadingProductsByCategory } = useProductStore();
  const { toggleSideBar, isSideBarOpen } = useUiStore();
  const { status, startLogout } = useAuthStore();


  const handleHome = () => {
    navigate('/');
    startLoadingProducts();
  };

  const handlerFilter = ( category ) => {
    handleHome();
    startLoadingProductsByCategory( category );
  }

  const handleRegister = () => {
    navigate('/auth/register');
  };

  return (
    <AnimatePresence>
      {isSideBarOpen && (
        <>
            {/* Fondo oscuro */}
            <motion.div
                className="fixed inset-0 bg-Black bg-opacity-40 z-40 md:hidden"
                onClick={ (e) => {
                  e.stopPropagation();
                  toggleSideBar();
                } }

                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            />

            {/* Sidebar */}
            <motion.div
                className="fixed top-0 right-0 w-64 h-full bg-Black text-white z-50 p-4 shadow-lg shadow-White md:hidden"

                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', stiffness: 100 }}
            >
                {/* Botón de cerrar */}
                <button 
                  onClick={(e) => {
                    e.stopPropagation(); // previene propagación
                    toggleSideBar();
                  }}
                  className="text-white text-3xl"
                >

                  <span className="material-symbols-outlined  h-9 w-9">menu_open</span>
                </button>

                {/* Agregá tus ítems de navegación acá */}
                <div className='mt-6 space-y-4'>
                  {
                    ( status !== 'authenticated' )
                    ? (
                      <div className='flex-1 flex justify-end items-center md:gap-x-4'>
                        <button 
                          className='block w-full h-9'
                          onClick={ handleRegister }
                        >
                          <span className="material-symbols-outlined flex-1 flex justify-center items-center">
                            account_circle
                          </span>
                        </button>
                      </div>
                    )
                    : (
                      <button
                        className='block w-full h-9'
                        onClick={ () => {
                            startLogout();
                            navigate('/');
                          }
                        }
                      >
                        <span className="material-symbols-outlined flex-1 flex justify-center items-center">
                          logout
                        </span>
                      </button>
                    )
                  }
                  
                  <button className='block w-full h-9' onClick={ handleHome } >
                    <span className="material-symbols-outlined">
                      home
                    </span>
                  </button>
                  <button className='block w-full h-9' onClick={ () => handlerFilter('Pantalones')}>Pantalones</button>
                  <button className='block w-full h-9' onClick={ () => handlerFilter('Remeras')}>Remeras</button>
                  <button className='block w-full h-9' onClick={ () => handlerFilter('Buzos')} >Buzos</button>
                </div>
                  
            </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
