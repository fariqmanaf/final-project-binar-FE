import * as React from 'react';
import { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { createLazyFileRoute, useNavigate } from '@tanstack/react-router';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Notification as Notifications } from '../../components/Notification/index';
import Navbar from '@/components/Navbar';
import { getNotifications, deleteNotification, readAllNotifications, readNotification } from '@/Services/notifications';
import toast, { Toaster } from 'react-hot-toast';
import { Button } from '@/components/ui/button';
import { FaChevronCircleUp } from 'react-icons/fa';
import { Loading } from '@/components/Loading';

export const Route = createLazyFileRoute('/notification/')({
  component: Notification,
});

function Notification() {
  const navigate = useNavigate();
  const [notificationsData, setNotifications] = useState([]);
  const [filteredNotifications, setFilteredNotifications] = useState([]);

  const { mutate: deleteNotif } = useMutation({
    mutationFn: (id) => deleteNotification(id),
    onSuccess: () => {
      toast.success('Notification deleted');
    },
    onError: () => {
      toast.error('Failed to delete notification');
    },
  });

  const { mutate: readNotif } = useMutation({
    mutationFn: (id) => readNotification(id),
    onSuccess: () => {
      toast.success('Notification Successfully Read');
    },
    onError: () => {
      toast.error('Failed to read notification');
    },
  });

  const { mutate: readAllNotif } = useMutation({
    mutationFn: () => readAllNotifications(),
    onSuccess: () => {
      toast.success('All Notifications Successfully Read');
    },
    onError: () => {
      toast.error('Failed to read all notifications');
    },
  });

  const {
    data: notifications,
    isLoading,
    isSuccess,
    isError,
  } = useQuery({
    queryKey: ['notifications'],
    queryFn: () => getNotifications(),
  });

  useEffect(() => {
    if (isSuccess) {
      setNotifications(notifications.data);
    }
    if (isError) {
      toast.error('Failed to fetch notifications');
    }
  }, [isSuccess, isError, notifications]);

  const handleSortChange = (value) => {
    if (value === 'viewed') {
      setFilteredNotifications(notificationsData.filter((notif) => notif.viewed === true));
    } else if (value === 'not-viewed') {
      setFilteredNotifications(notificationsData.filter((notif) => notif.viewed === false));
    }
  };

  const handleDeleteNotif = (id) => {
    deleteNotif(id);
    setNotifications(notificationsData.filter((notif) => notif.id !== id));
  };

  const handleReadNotif = (id) => {
    readNotif(id);
    setNotifications(
      notificationsData.map((notif) => {
        if (notif.id === id) {
          return {
            ...notif,
            viewed: true,
          };
        }
        return notif;
      })
    );
  };

  const handleReadAllNotif = () => {
    readAllNotif();
    setNotifications(
      notificationsData.map((notif) => {
        return {
          ...notif,
          viewed: true,
        };
      })
    );
  };

  return (
    <>
      <Toaster position="top-right" />
      <FaChevronCircleUp
        onClick={() => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        className="fixed bottom-10 right-10 w-[2rem] h-[2rem] cursor-pointer hover:text-[#A06ECE]"
      />
      <Navbar isAuth={true} />
      <div className="font-poppins container mx-auto w-full md:w-[90%] lg:w-[80%] px-4 py-8">
        <div className="w-full flex justify-between items-center mb-5">
          <h1 className="md:text-[1rem] text-[1.5rem] font-bold lg:text-2xl">
            <p>Notifikasi</p>
          </h1>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div
            className="bg-[#A06ECE] text-white p-4 md:w-[10rem] w-full flex-grow rounded-xl flex items-center h-[3rem]"
            onClick={() => navigate({ to: `/` })}
          >
            <img src="/fi_arrow-left.svg" alt="back-button" className="cursor-pointer mr-2" />
            <span className="text-[1rem]">Beranda</span>
          </div>
          <div className="w-full md:w-auto flex justify-center items-center">
            <Select className="border border-[#A06ECE] rounded-3xl" onValueChange={handleSortChange}>
              <SelectTrigger className="w-full lg:w-auto border-[#A06ECE] rounded-3xl text-black ">
                <img src="/Prefix_icon.svg" alt="prefix-icon" className="cursor-pointer mr-2" />
                <SelectValue placeholder="Filter" />
              </SelectTrigger>
              <SelectContent className="text-[#A06ECE] bg-white border border-[#A06ECE] rounded-xl">
                <SelectGroup>
                  <SelectItem value="viewed" className="flex items-center focus:bg-[#7126B5] focus:text-white">
                    Dibaca
                  </SelectItem>
                  <Separator orientation="horizontal" className="w-full" />
                  <SelectItem value="not-viewed" className="flex items-center focus:bg-[#7126B5] focus:text-white">
                    Belum Dibaca
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <Button
            onClick={handleReadAllNotif}
            className="w-full md:w-auto lg:w-1/8 flex justify-center items-center rounded-full bg-transparent border border-[#7126B5] text-gray-800 hover:bg-transparent"
          >
            Read All
          </Button>
        </div>
        <div className="w-full mt-4">
          {isLoading ? (
            <div className="w-full h-[60vh] flex justify-center items-center">
              <Loading text={'Memuat Notifikasi Anda...'} />
            </div>
          ) : (
            <Notifications
              notifications={filteredNotifications.length > 0 ? filteredNotifications : notificationsData}
              handleDeleteNotif={handleDeleteNotif}
              handleReadNotif={handleReadNotif}
            />
          )}
        </div>
      </div>
    </>
  );
}
