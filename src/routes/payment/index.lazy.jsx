import * as React from 'react';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/payment/')({
  component: RouteComponent,
});

function RouteComponent() {
  return 'Hello /auth/payment/!';
}