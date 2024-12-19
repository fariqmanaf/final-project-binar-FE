import * as React from 'react';
import { useState } from 'react';
import { createLazyFileRoute, useNavigate } from '@tanstack/react-router';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Notification as Notifications } from '../../components/Notification/index';
import Navbar from '@/components/Navbar';

export const Route = createLazyFileRoute('/notification/')({
  component: Notification,
});

function Notification() {
  const navigate = useNavigate();
  const [sortOrder, setSortOrder] = useState('terbaru');

  const notifications = [
    {
      id: 1,
      type: 'Promosi',
      message: 'Dapatkan Potongan 50% Tiket!',
      details: 'Syarat dan Ketentuan berlaku!',
      date: '2024-03-20T14:04:00Z',
    },
    {
      id: 2,
      type: 'Pengingat',
      message: 'Jangan lupa untuk memperbarui kata sandi akun Anda setiap 3 bulan.',
      details: 'Pastikan kata sandi baru kuat dan aman.',
      date: '2024-03-15T10:20:00Z',
    },
    {
      id: 3,
      type: 'Berita',
      message: 'Aplikasi versi terbaru telah dirilis. Dapatkan fitur-fitur terbaru sekarang juga.',
      details: 'Unduh pembaruan di toko aplikasi favorit Anda.',
      date: '2024-03-10T08:45:00Z',
    },
    {
      id: 4,
      type: 'Notifikasi',
      message: 'Terdapat perubahan pada jadwal penerbangan kode booking 45GT6. Cek jadwal perjalanan Anda disini!',
      details: '',
      date: '2024-03-05T17:30:00Z',
    },
    {
      id: 5,
      type: 'Promosi',
      message: 'Diskon 30% untuk semua produk selama bulan ini!',
      details: 'Jangan lewatkan kesempatan ini.',
      date: '2024-03-01T09:15:00Z',
    },
    {
      id: 6,
      type: 'Pengingat',
      message: 'Pembaruan perangkat lunak akan tersedia mulai minggu depan.',
      details: 'Pastikan perangkat Anda terhubung ke internet.',
      date: '2024-02-28T11:40:00Z',
    },
    {
      id: 7,
      type: 'Berita',
      message: 'Fitur baru telah ditambahkan ke aplikasi.',
      details: 'Cek fitur baru tersebut sekarang juga.',
      date: '2024-02-25T08:50:00Z',
    },
    {
      id: 8,
      type: 'Pengingat',
      message: 'Jangan lupa verifikasi email Anda untuk keamanan akun.',
      details: 'Klik link verifikasi yang dikirimkan ke email Anda.',
      date: '2024-02-18T07:45:00Z',
    },
  ];

  const sortedNotifications = [...notifications].sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return sortOrder === 'terbaru' ? dateB - dateA : dateA - dateB;
  });

  const handleSortChange = (value) => {
    setSortOrder(value);
  };

  return (
    <>
      <Navbar isAuth={true} searchBar={false} />
      <div className="font-poppins container mx-auto w-full md:w-[90%] lg:w-[70%] px-4 py-8">
        <div className="w-full flex justify-between items-center mb-5">
          <h1 className="text-[20px] lg:text-2xl">
            <strong>Notifikasi</strong>
          </h1>
        </div>
        <div className="flex flex-col md:flex-row px-[8px] py-[16px] justify-between">
          <div
            className="flex bg-[#A06ECE] text-white p-4 rounded-xl mb-4 md:mb-0 flex items-center h-16 md:w-full lg:w-5/6"
            onClick={() => navigate({ to: `/` })}
          >
            <img src="/fi_arrow-left.svg" alt="back-button" className="cursor-pointer mr-2" />
            <span className="text-[16px]">Beranda</span>
          </div>
          <div className="w-full md:w-auto lg:w-1/6 mt-2 md:mt-0 ml-0 md:ml-4 flex justify-center items-center">
            <Select className="border border-[#A06ECE] rounded-3xl" onValueChange={handleSortChange}>
              <SelectTrigger className="w-full lg:w-auto border-[#A06ECE] rounded-3xl text-black ">
                <img src="/Prefix_icon.svg" alt="prefix-icon" className="cursor-pointer mr-2" />
                <SelectValue placeholder="Filter" />
              </SelectTrigger>
              <SelectContent className="text-[#A06ECE] bg-white border border-[#A06ECE] rounded-xl">
                <SelectGroup>
                  <SelectItem value="terbaru" className="flex items-center focus:bg-[#7126B5] focus:text-white">
                    Terbaru
                  </SelectItem>
                  <Separator orientation="horizontal" className="w-full" />
                  <SelectItem value="terlama" className="flex items-center focus:bg-[#7126B5] focus:text-white">
                    Terlama
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="w-full lg:w-5/6">
          <Notifications notifications={sortedNotifications} />
        </div>
      </div>
    </>
  );
}
