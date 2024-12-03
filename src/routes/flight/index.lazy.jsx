import * as React from 'react';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/flight/')({
  component: RouteComponent,
});

function RouteComponent() {
  return 'Hello /flight/!';
}
