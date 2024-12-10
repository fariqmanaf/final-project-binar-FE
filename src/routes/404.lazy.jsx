import * as React from 'react';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/404')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex items-center justify-center w-screen h-screen">
      <h1 className="text-4xl font-bold text-gray-800">404 Not Found</h1>
    </div>
  );
}
