import * as React from 'react';
import { useState } from 'react';
import { createLazyFileRoute, useNavigate } from '@tanstack/react-router';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { useToast } from '@/components/hooks/use-toast';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';

export const Route = createLazyFileRoute('/account/')({
  component: Account,
});

function Account() {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [namaLengkap, setNamaLengkap] = useState('Harry');
  const [nomorTelepon, setNomorTelepon] = useState('+62 897823232');
  const [email, setEmail] = useState('Johndoe@gmail.com');

  // ubah input
  const handleNamaLengkapChange = (event) => setNamaLengkap(event.target.value);
  const handleNomorTeleponChange = (event) => setNomorTelepon(event.target.value);
  const handleEmailChange = (event) => setEmail(event.target.value);

  return (
    <>
      <Navbar isAuth={true} searchBar={false} />
      <div className="font-poppins container mx-auto w-[90%] md:w-[70%] px-4 py-8">
        <div className="w-full flex justify-between items-center mb-5">
          <h1 className="text-[20px] lg:text-2xl">
            <strong>Akun</strong>
          </h1>
        </div>
        <div
          className="flex-1 bg-[#A06ECE] text-white p-4 rounded-xl mb-4 flex items-center h-16"
          onClick={() => navigate({ to: `/` })}
        >
          <img src="/fi_arrow-left.svg" alt="back-button" className="cursor-pointer mr-2" />
          <span className="text-[16px]">Beranda</span>
        </div>

        <div className="flex flex-col lg:flex-row mt-[20px]">
          <div className="w-full lg:w-2/6 mb-4 lg:mb-0">
            <div className="p-6 space-y-4">
              <div className="flex items-center mb-4">
                <img src="/fi_edit-3.svg" alt="edit" className="cursor-pointer mr-2" />
                <span>Ubah Profil</span>
              </div>
              <Separator orientation="horizontal" className="w-full h-[1px]" />
              <div className="flex items-center mb-4">
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <div className="flex items-center cursor-pointer">
                      <img src="/fi_log-out.svg" alt="logout" className="cursor-pointer mr-2" />
                      <span>Keluar</span>
                    </div>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Keluar dari akun Anda?</AlertDialogTitle>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel className="bg-red-500 hover:bg-red-800 hover:text-white text-white">
                        Batalkan
                      </AlertDialogCancel>
                      <AlertDialogAction className="bg-[#A06ECE] hover:bg-[#4B1979] text-white">
                        Keluar
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
              <Separator orientation="horizontal" className="w-full h-[1px]" />
            </div>
            <div className="flex justify-center">
              <p className="text-[#8A8A8A] text-xs">Version 1.1.0</p>
            </div>
          </div>

          <div className="w-full lg:w-4/6">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-[20px] mb-4 text-bold">
                <strong>Ubah Data Profil</strong>
              </h2>
              <div className="mb-4 bg-[#A06ECE] rounded-t-lg">
                <p className="text-white px-[16px] py-[8px]">Data Diri</p>
              </div>
              <div className=" px-[16px] ">
                <div className="mb-4">
                  <Label className="text-[#4B1979]">Nama Lengkap</Label>
                  <Input
                    className="w-full p-2 border border-[#D0D0D0] rounded mt-1"
                    placeholder="Nama Lengkap"
                    value={namaLengkap}
                    onChange={handleNamaLengkapChange}
                  />
                </div>

                <div className="mb-4">
                  <Label className="text-[#4B1979]">Nomor Telepon</Label>
                  <Input
                    className="w-full p-2 border border-[#D0D0D0] rounded mt-1"
                    placeholder="Nomor Telepon"
                    value={nomorTelepon}
                    onChange={handleNomorTeleponChange}
                  />
                </div>

                <div className="mb-4">
                  <Label htmlFor="email" className="text-[#4B1979]">
                    Email
                  </Label>
                  <Input
                    type="email"
                    id="email"
                    placeholder="Email"
                    className="w-full p-2 border border-[#D0D0D0] rounded mt-1"
                    value={email}
                    onChange={handleEmailChange}
                  />
                </div>
                <div className="flex justify-center">
                  <Button
                    className="bg-[#A06ECE] hover:bg-[#4B1979] text-white w-[150px] h-[48px] rounded-xl shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
                    onClick={() => {
                      toast({
                        title: 'Data Berhasil Disimpan',
                      });
                    }}
                  >
                    Simpan
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
