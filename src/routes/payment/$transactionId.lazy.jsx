import React, { useEffect, useState } from 'react';
import { createLazyFileRoute, useParams } from '@tanstack/react-router';
import Navbar from '@/components/Navbar';
import { DetailFlight, Pricing } from '@/components/PassengerForm/detail-flight';
import { getTransactionById } from '@/Services/payment';
import { useQuery } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { BreadCrumb } from '@/components/Breadcrumb';

export const Route = createLazyFileRoute('/payment/$transactionId')({
  component: RouteComponent,
});

function RouteComponent() {
  const passenger = [
    {
      type: 'ADULT',
      quantity: 1,
    },
    {
      type: 'CHILD',
      quantity: 1,
    },
    {
      type: 'INFANT',
      quantity: 1,
    },
  ];

  const transactionId = Route.useParams().transactionId;
  const [transactionData, setTransactionData] = useState(null);

  const {
    data: transaction,
    isLoading,
    isSuccess,
    isError,
  } = useQuery({
    queryKey: ['transaction', transactionId],
    queryFn: () => getTransactionById(transactionId),
  });

  useEffect(() => {
    if (isSuccess) {
      setTransactionData(transaction);
    }
  }, [isSuccess, transaction]);

  useEffect(() => {
    const midtransScriptUrl = 'https://app.sandbox.midtrans.com/snap/snap.js';

    let scriptTag = document.createElement('script');
    scriptTag.src = midtransScriptUrl;

    const myMidtransClientKey = import.meta.env.VITE_MIDTRANS_CLIENT_KEY;
    scriptTag.setAttribute('data-client-key', myMidtransClientKey);

    document.body.appendChild(scriptTag);

    return () => {
      document.body.removeChild(scriptTag);
    };
  }, []);

  function handlePayment() {
    if (transactionData?.payment?.snapToken && window.snap) {
      window.snap.embed(transactionData.payment.snapToken, {
        embedId: 'snap-container', // ID div tempat embed ditampilkan
      });
    } else {
      console.error('Snap token or snap.js is not available');
    }
  }

  useEffect(() => {
    if (isSuccess && transactionData?.payment?.snapToken) {
      handlePayment();
    }
  }, [isSuccess, transactionData]);

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <Navbar searchBar={true} isAuth={true} />

      <div className="w-screen h-[10vh] md:px-[10rem] px-[3rem] py-[3rem]">
        <BreadCrumb active="payment" />
      </div>
      <div className="flex justify-center w-full container mx-auto gap-3 mt-10">
        <div className="w-[30vw] p-6" id="snap-container"></div>

        <div className="w-5/12 rounded-lg p-6">
          <h2 className="font-bold text-xl mb-4">
            Booking Code: <span className="text-[#7126B5]">6723y2GHK</span>
          </h2>
          <div className="flex flex-col gap-[3vh]">
            <DetailFlight data={transactionData?.departureFlight} returnData={false} />
            {transactionData?.returnFlight && <DetailFlight data={transactionData?.returnFlight} returnData={true} />}
            <Pricing data={transactionData} passenger={passenger} />
          </div>
        </div>
      </div>
    </>
  );
}
