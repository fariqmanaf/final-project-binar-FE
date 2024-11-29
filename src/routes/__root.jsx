import { createRootRoute, Outlet, useLocation } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import '../index.css';
import Navbar from '@/components/Navbar';

export const Route = createRootRoute({
  component: () => {
    const location = useLocation();
    const authPaths = [
      '/auth/login',
      '/auth/register',
      '/auth/otp',
      '/auth/password-reset/$token',
      '/auth/password-reset/verify-email',
    ];

    const isAuthRoute = authPaths.some((path) => location.pathname.startsWith(path));
    return (
      <>
        <div style={{ display: 'flex' }}>
          {/* Main Content */}
          <div style={{ flex: 5 }}>
            {!isAuthRoute && <Navbar />}
            <Outlet />
          </div>
        </div>
        <TanStackRouterDevtools />
      </>
    );
  },
});
