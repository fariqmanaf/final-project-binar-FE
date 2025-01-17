import { createRootRoute, notFound, Outlet, useLocation, useNavigate } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import '../index.css';
import { useEffect } from 'react';
import { getCurrentUser } from '@/Services/auth/auth';
import { useQuery } from '@tanstack/react-query';
import { setToken, setUser } from '@/redux/slices/auth';
import { useDispatch } from 'react-redux';
import { NotFoundPage } from '@/components/404';

export const Route = createRootRoute({
  component: () => <Root />,
  notFoundComponent: () => <NotFoundPage />,
});

function Root() {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token = localStorage.getItem('token');

  const {
    data: userData,
    isError,
    isSuccess,
  } = useQuery({
    queryKey: ['user'],
    queryFn: () => getCurrentUser(),
    enabled: !!token,
  });

  useEffect(() => {
    if (isSuccess) {
      dispatch(setUser(userData));
    } else if (isError) {
      localStorage.removeItem('token');
      dispatch(setToken(null));
      dispatch(setUser(null));
      navigate({ to: '/auth/login' });
    }
  }, [isError, isSuccess, userData, dispatch, navigate]);

  useEffect(() => {
    location.pathname === '/auth/logout' && localStorage.removeItem('token');
    if (location.pathname === '/auth/logout') {
      localStorage.removeItem('token');
      navigate({ to: '/auth/login' });
    }
    if (location.pathname === '*') {
      navigate({ to: '/404' });
    }
  }, [location, navigate]);

  return (
    <>
      <div style={{ display: 'flex' }}>
        {/* Main Content */}
        <div style={{ flex: 5 }}>
          <Outlet />
        </div>
      </div>
    </>
  );
}
