import * as React from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';

export function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="font-poppins container mx-auto w-[90%] md:w-[80%] px-4 py-8">
      <div className="flex flex-col md:flex-row items-center justify-center text-center md:text-left p-4">
        <img src="/notfound2.svg" alt="Tidak Ditemukan" className="mb-4 md:mb-0 md:mr-8 w-64 md:w-auto" />
        <div>
          <h1 className="text-4xl font-bold mb-4">
            Oops! <br /> Halaman Tidak Ditemukan
          </h1>
          <p className="text-lg mb-4 text-justify">
            Halaman yang Anda cari mungkin telah dihapus, namanya diubah, atau sementara tidak tersedia. Kami mohon maaf
            atas ketidaknyamanan ini. Silakan periksa URL Anda atau gunakan tombol di bawah ini untuk kembali ke
            beranda.
          </p>
          <Button
            className="bg-[#A06ECE] mt-[5px] hover:bg-[#4B1979] text-white w-[150px] h-[48px] rounded-xl shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
            onClick={() => navigate({ to: `/` })}
          >
            Kembali ke Beranda
          </Button>
        </div>
      </div>
    </div>
  );
}
