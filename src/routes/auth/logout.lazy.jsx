import * as React from 'react';
import { createLazyFileRoute } from '@tanstack/react-router';
import ReactLoading from 'react-loading';

export const Route = createLazyFileRoute('/auth/logout')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex flex-col justify-center items-center h-screen w-screen">
      <ReactLoading type={'spin'} color={'#0d6efd'} height={'5%'} width={'5%'} />
    </div>
  );
}
