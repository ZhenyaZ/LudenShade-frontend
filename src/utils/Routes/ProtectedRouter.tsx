import { useUserStore } from '../stores/UserStore/store';
import { Navigate, Outlet } from 'react-router-dom';

function ProtectedRouter() {
  const isAuth = useUserStore((state) => state.isAuth);
  if (!isAuth) {
    return <Navigate to={'/error'} state={{ error: 'You are not logged in', from: 'protected' }} />;
  }

  return <Outlet />;
}

export default ProtectedRouter;
