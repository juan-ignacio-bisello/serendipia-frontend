import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../hooks';

export const PrivateRoute = ({ children }) => {
  

    const { user } = useAuthStore();
    const role = user?.role;

    if ( role !== 'authenticated-ADMIN' ) {
        return <Navigate to="/*" />
    }

    return children;
}
