import { BreadCrumb } from '@/components/Breadcrumb';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { printTicket } from '@/Services/payment';
import { useMutation } from '@tanstack/react-query';
import { createLazyFileRoute, Link, useNavigate } from '@tanstack/react-router';
import { Toaster, toast } from 'react-hot-toast';
import ReactLoading from 'react-loading';

export const Route = createLazyFileRoute('/payment/done')({
  component: Done,
});

function Done() {
  const navigate = useNavigate();
  const paymentResult = JSON.parse(localStorage.getItem('paymentResult'));
  const order_id = paymentResult?.order_id;

  const { mutate, isPending } = useMutation({
    mutationFn: (transactionId) => printTicket(transactionId),
    onSuccess: () => {
      toast.success('Tiket Berhasil Dicetak, Cek Email Anda');
      navigate({ to: '/history' });
      localStorage.removeItem('paymentResult');
    },
    onError: () => {
      toast.error('Gagal Mencetak Tiket');
    },
  });

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <Navbar isAuth={true} />
      <div className="w-screen h-[10vh] md:px-[10rem] px-[3rem] py-[3rem]">
        <BreadCrumb active="done" />
      </div>
      <div className="flex flex-col gap-[3rem] justify-center items-center w-screen h-[80vh]">
        <div className="flex flex-col gap-[2rem] items-center">
          <img src="/🦆 illustration _Cart shopping list_.svg" alt="" className="w-[80%]" />
          <p className="text-center font-medium">
            <span className="text-[#7126B5]">Selamat</span>
            <br />
            Transaksi Pembayaran Tiket sukses!
          </p>
        </div>
        <div className="flex flex-col gap-[1rem] w-[20%]">
          <Button
            className="bg-[#7126B5] text-white rounded-xl px-6 py-2 hover:bg-[#5e2494]"
            onClick={() => {
              mutate(order_id);
            }}
          >
            {isPending ? (
              <ReactLoading
                type={'spin'}
                color={'#FFFFFF'}
                height={'15%'}
                width={'15%'}
                className="flex justify-center items-center"
              />
            ) : (
              <p>Terbitkan Tiket</p>
            )}{' '}
          </Button>
          <Button className="bg-[#7126B5] text-white rounded-xl px-6 py-2 hover:bg-[#5e2494]">
            <Link to="/">Cari Penerbangan Lain</Link>
          </Button>
        </div>
      </div>
    </>
  );
}
