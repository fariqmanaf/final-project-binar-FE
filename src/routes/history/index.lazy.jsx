import * as React from 'react';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/history/')({
  component: RouteComponent,
});

function RouteComponent() {
  return 'Hello /history/!';
}