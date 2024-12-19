import { BreadCrumb } from '@/components/Breadcrumb';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { createLazyFileRoute, Link, useSearch } from '@tanstack/react-router';
import { useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';

export const Route = createLazyFileRoute('/payment/done')({
  component: Done,
});

function Done() {
  const searchParams = Route.useSearch();
  const order_id = searchParams?.order_id;
  const [loading, setLoading] = useState(false);

  async function handlePrintTicket() {
    setLoading(true);
    const url = `${import.meta.env.VITE_API_URL}/transactions/${order_id}/print`;
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    if (!res.ok) {
      toast.error('Gagal terbitkan tiket');
      setLoading(false);
      return;
    }
    toast.success('Tiket berhasil diterbitkan');
    setLoading(false);
  }

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <Navbar isAuth={true} searchBar={true} />
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
            onClick={handlePrintTicket}
            disabled={loading}
          >
            Terbitkan Tiket
          </Button>
          <Button className="bg-[#7126B5] text-white rounded-xl px-6 py-2 hover:bg-[#5e2494]">
            <Link to="/flight">Cari Penerbangan Lain</Link>
          </Button>
        </div>
      </div>
    </>
  );
}
