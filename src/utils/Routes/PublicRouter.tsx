import { useUserStore } from '../stores/UserStore/store';
import { Navigate, Outlet } from 'react-router-dom';
function PublicRouter() {
  const { isAuth } = useUserStore((state) => ({
    isAuth: state.isAuth,
  }));

  if (isAuth) {
    return <Navigate to={'/home'} />;
  }
  return <Outlet />;
}

export default PublicRouter;
