import React, { useEffect, useState } from 'react';
import { createLazyFileRoute, useNavigate, useParams } from '@tanstack/react-router';
import Navbar from '@/components/Navbar';
import { DetailFlight, Pricing } from '@/components/PassengerForm/detail-flight';
import { getTransactionById } from '@/Services/payment';
import { useQuery } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { BreadCrumb } from '@/components/Breadcrumb';
import { motion } from 'framer-motion';
import ReactLoading from 'react-loading';
import { toast } from 'react-hot-toast';
import { Button } from '@/components/ui/button';

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

  const navigate = useNavigate();
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
    if (isSuccess && transaction) {
      setTransactionData(transaction);
    } else if (isError) {
      toast.error('Data pesanan tidak ditemukan', {
        duration: 5000,
      });
    }
  }, [isSuccess, transaction, isError]);

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
    if (transaction?.payment?.snapToken && window.snap) {
      window.snap.embed(transaction.payment.snapToken, {
        embedId: 'snap-container',
        onSuccess: function () {
          toast.success('Pembayaran berhasil!', {
            duration: 5000,
          });
          navigate('/payment/done');
        },
        onPending: function () {
          toast.info('Pembayaran dalam status pending. Anda akan diarahkan ke riwayat.', {
            duration: 5000,
          });
          navigate('/history');
        },
        onError: function () {
          toast.error('Pembayaran gagal. Anda akan diarahkan ke riwayat.', {
            duration: 5000,
          });
          navigate('/history');
        },
        onClose: function () {
          toast('Anda menutup dialog pembayaran tanpa menyelesaikannya.', {
            duration: 5000,
          });
        },
      });
    } else {
      console.error('Snap token atau snap.js tidak tersedia');
    }
  }

  function handlePayLater() {
    toast.info('Pembayaran ditunda. Anda akan diarahkan ke riwayat.', {
      duration: 5000,
    });
    navigate('/history');
  }

  useEffect(() => {
    if (isSuccess && transactionData?.payment?.snapToken) {
      handlePayment();
    }
  }, [isSuccess, transactionData]);

  if (isError) {
    return <div className="w-screen h-[90vh] flex justify-center items-center">Payment is not found</div>;
  }

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <Navbar searchBar={true} isAuth={true} />
      {isLoading && (
        <div className="flex justify-center items-center w-screen h-[90vh]">
          <ReactLoading type="spin" color="#7126B5" />
        </div>
      )}
      {isError ? (
        <div className="w-screen h-[90vh] flex justify-center items-center">Payment is not found</div>
      ) : (
        <>
          <div className="w-screen h-[10vh] md:px-[10rem] px-[3rem] py-[3rem]">
            <BreadCrumb active="payment" />
          </div>
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="flex md:flex-row-reverse flex-col w-screen px-[10vw] gap-[3vw]"
          >
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="flex flex-col gap-[1rem] md:w-[40%]"
            >
              <h2 className="font-semibold text-xl border border-slate-200 rounded-lg shadow-md p-6">
                Booking Code: <span className="text-[#7126B5]">{transactionData?.code}</span>
              </h2>
              <div className="flex flex-col gap-[1rem]">
                <DetailFlight data={transactionData?.departureFlight} returnData={false} />
                {transactionData?.returnFlight && (
                  <DetailFlight data={transactionData?.returnFlight} returnData={true} />
                )}
                <Pricing data={transactionData} passenger={passenger} />
              </div>
              <Button
                className="bg-[#7126B5] text-white py-2 px-4 rounded-md hover:bg-[#5e2494] mt-2"
                onClick={handlePayLater}
              >
                Bayar Nanti
              </Button>
            </motion.div>

            <div className="md:w-[60%] h-fit border border-slate-300 rounded-lg">
              <div className="w-full h-auto overflow-hidden p-6" id="snap-container"></div>
            </div>
          </motion.div>
        </>
      )}
    </>
  );
}
