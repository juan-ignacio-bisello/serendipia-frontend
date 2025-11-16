import { useDispatch, useSelector } from 'react-redux';
import { clearErrorMessage, onLogout, onChecking, onLogin } from '../store';
import serendipiaApi from '../api';
import { useNavigate } from 'react-router-dom';

export const useAuthStore = () => {

  const { status, user, errorMessage } = useSelector( state => state.auth );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const startLogin = async({ email, password }) => {

    dispatch( onChecking() );

    try {
      
      // API call to login
      const { data } = await serendipiaApi.post('/auth', { email, password });
      
      localStorage.setItem( 'token', data.token );
      localStorage.setItem( 'token-init-date', new Date().getTime() );

      dispatch( onLogin({ 
        uid: data.uid,
        name: data.name,
        email: data.email,

        role: data.role ? data.role : 'USER',
        image: data.image ? data.image : null
      }));

      navigate('/');

    } catch (error) {
        console.log(error);

        const message = error?.response?.data?.msg;
        dispatch(onLogout(message));

        setTimeout(() => {
          dispatch(clearErrorMessage());
        }, 1000);
      }

  }

  const startRegister = async({ email, password, name }) => {

    dispatch( onChecking() );

    try {
      
      // API call to register
      const { data } = await serendipiaApi.post('/auth/new', { email, password, name });

      localStorage.setItem( 'token', data.token );
      localStorage.setItem( 'token-init-date', new Date().getTime() );

      dispatch( onLogin({
        uid: data.uid,
        name: data.name,
        email: data.email,
        image: data.image ? data.image : null
      }))

      navigate('/');

    } catch (error) {
      console.log(error);
        
      const message = error?.response?.data?.msg || 'Error al registrar usuario';
      dispatch(onLogout(message));
        
      setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 1000);
    }

  }

  const checkAuthToken = async() => {
    
    const token = localStorage.getItem('token');
    if ( !token ) return dispatch( onLogout() );

    try {
      // API call to check token
      const { data } = await serendipiaApi.get('/auth/renew');

      localStorage.setItem( 'token', data.token );
      localStorage.setItem( 'token-init-date', new Date().getTime() );

      dispatch( onLogin({ 
        uid: data.uid,
        name: data.name,
        email: data.email,
        role: data.role,
        image: data.image ? data.image : null
      }));

    } catch (error) {
      localStorage.clear();
      dispatch( onLogout() );
    }
  }

  const startLogout = () => {
    localStorage.clear();
    dispatch( onLogout() );
  }


  return { 
    //* Properties
    status, 
    user, 
    errorMessage,

    //* Method
    startLogin,
    startRegister,
    checkAuthToken,
    startLogout,
  }
}
