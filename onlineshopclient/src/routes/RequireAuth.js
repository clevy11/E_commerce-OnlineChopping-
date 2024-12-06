import { useLocation, Navigate, Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

function RequireAuth({ requiredRoles }) {
  const { auth } = useAuth();
  const location = useLocation();


  return (
    !auth?.token
      ? <Navigate to="/login" state={{ from: location }} replace />
      : auth?.token && !requiredRoles.includes(auth?.profile?.role) 
      ? <Navigate to="/forbidden" state={{ from: location }} replace /> 
      : <Outlet />
  );
}

export default RequireAuth;
