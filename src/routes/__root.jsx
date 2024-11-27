import { createRootRoute, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import '../index.css';

export const Route = createRootRoute({
  component: () => (
    <>
      <div style={{ display: 'flex' }}>
        {/* Main Content */}
        <div style={{ flex: 5 }}>
          <Outlet />
        </div>
      </div>
      <TanStackRouterDevtools />
    </>
  ),
});
