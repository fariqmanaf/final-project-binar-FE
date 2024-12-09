import * as React from 'react';
import { createLazyFileRoute } from '@tanstack/react-router';
import Navbar from '@/components/Navbar';
import DataPembayaran from '@/components/Section/DataPembayaran';

export const Route = createLazyFileRoute('/payment/')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <Navbar searchBar={true} isAuth={true} />

      <div className="flex justify-center w-full container mx-auto gap-3 mt-10">
        <div className="w-7/12 p-6">
          <DataPembayaran
            data={[
              {
                title: 'Gopay',
                content: 'Yes. It adheres to the WAI-ARIA design pattern.',
              },
              {
                title: 'Virtual Account',
                content: 'Yes. It comes with default styles that matches the other components aesthetic.',
              },
              {
                title: 'Credit Card',
                content: "Yes. It's animated by default, but you can disable it if you prefer.",
              },
            ]}
          />
        </div>

        <div className="w-5/12 rounded-lg p-6">
          <h2 className="font-bold text-xl mb-4">
            Booking Code: <span className="text-[#7126B5]">6723y2GHK</span>
          </h2>
        </div>
      </div>
    </>
  );
}
