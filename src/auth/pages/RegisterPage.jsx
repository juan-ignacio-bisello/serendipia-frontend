import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useForm } from "../../hooks/useForm";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../hooks/useAuthStore";
import Swal from 'sweetalert2';


const registerFormFields = {
    registerName:      '',
    registerEmail:     '',
    registerPassword:  '',
    registerPassword2: '',
}

export const RegisterPage = () => {

    const { startRegister, errorMessage } = useAuthStore();

    const { 
        registerName,
        registerEmail,
        registerPassword,
        registerPassword2,
        onInputChange 
    } = useForm( registerFormFields );

    const navigate = useNavigate();

    const handleHome = () => {
      navigate('/');
    };
    const handleLogin = () => {
      navigate('/auth/login');
    };

    const onSubmit = ( event ) => {
      event.preventDefault();

      if ( registerPassword !== registerPassword2 ) {
        return Swal.fire('Error en el registro', 'Las contraseñas deben coincidir', 'error');
      }
      
      startRegister({
        name: registerName,
        email: registerEmail,
        password: registerPassword,
        password2: registerPassword2
      });
    }

    useEffect(() => {
          if ( errorMessage && typeof errorMessage === 'string' ) {
            Swal.fire('Error en la autentificación', errorMessage, 'error' );
          }
        }, [errorMessage])

  return (
    <>
      <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.3 }}
          className="..."
      >
        <div className="flex size-2/3 place-content-center justify-self-center py-24">
          <div className="table-row w-80 shadow-xl shadow-Gray justify-center rounded-lg p-28"> 
            <h3 className="text-White text-2xl">Registro</h3>
            <form onSubmit={ onSubmit}>
              <div className="flex justify-center my-3">
                <input
                  type="text"
                  className="text-gray-500 rounded-sm"
                  placeholder=" Nombre"
                  name="registerName"
                  value={registerName}
                  onChange={onInputChange}
                />
              </div>
              <div className="flex justify-center my-3">
                <input
                  type="email"
                  className="text-gray-500 rounded-sm"
                  placeholder=" Correo"
                  name="registerEmail"
                  value={registerEmail}
                  onChange={onInputChange}
                />
              </div>
              <div className="flex justify-center my-3">
                <input
                  type="password"
                  className="text-gray-500 rounded-sm"
                  placeholder=" Contraseña"
                  name="registerPassword"
                  value={registerPassword}
                  onChange={onInputChange}
                />
              </div>
              <div className="flex justify-center my-3">
                <input
                  type="password"
                  className="text-gray-500 rounded-sm"
                  placeholder=" Repita la contraseña"
                  name="registerPassword2"
                  value={registerPassword2}
                  onChange={onInputChange}
                />
              </div>
              <div className="flex justify-center my-3">
                <button 
                  type="submit" 
                  className="flex px-4 py-2 w-full justify-center text-lg"
                >
                  Register
                </button>
              </div>

            </form>

              <div className="flex justify-center mt-16 gap-4">

                <button 
                  className="flex px-4 py-2 w-full justify-center text-sm bg-Black text-Gray shadow shadow-Pink"
                  onClick={ handleLogin }
                >
                  Login
                </button>

                <button 
                  className="flex px-4 py-2 w-full justify-center text-sm bg-Black text-Gray shadow shadow-Pink"
                  onClick={ handleHome }
                >
                  Home
                </button>
              </div>
            </div>
        </div>
      </motion.div>
    </>
  )
}
