import * as React from 'react';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/notification/')({
  component: RouteComponent,
});

function RouteComponent() {
  return 'Hello /notification/!';
}
