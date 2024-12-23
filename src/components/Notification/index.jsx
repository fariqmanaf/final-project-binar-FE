import React from 'react';
import { Separator } from '@/components/ui/separator';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '../ui/button';

export function Notification({ notifications, handleDeleteNotif, handleReadNotif }) {
  return (
    <>
      {notifications.map((notif) => (
        <Popover key={notif?.id}>
          <PopoverTrigger asChild>
            <div key={notif?.id} className="bg-white p-4 cursor-pointer">
              <div className="flex flex-col md:flex-row justify-between items-start">
                <div className="w-fit flex items-start">
                  <img src="/notifications.svg" alt="notification" className="cursor-pointer" />
                </div>
                <div className=" w-full flex-grow ml-0 md:ml-4 mt-2 md:mt-0">
                  <div className="flex justify-between items-center md:items-start">
                    <span className="text-[#8A8A8A] text-[14px]">{notif?.name}</span>
                    <span className="text-[#8A8A8A] text-[14px] text-sm md:ml-4 flex items-center gap-[1vw]">
                      {new Date(notif?.createdAt).toLocaleString({
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                        hour: 'numeric',
                        minute: 'numeric',
                      })}
                      <span>
                        <div
                          className={`${notif?.viewed === true ? 'bg-green-500' : 'bg-red-600'} w-[0.6rem] h-[0.6rem] rounded-full`}
                        ></div>
                      </span>
                    </span>
                  </div>
                  <p className="text-black text-[16px]">{notif?.description}</p>
                </div>
              </div>
              <Separator orientation="horizontal" className="w-full h-[1px] mt-2" />
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="grid gap-4">
              <div className="grid gap-2">
                {notif?.viewed === false && (
                  <Button
                    onClick={() => handleReadNotif(notif?.id)}
                    className="bg-transparent text-black border hover:text-white hover:bg-[#7126B5]"
                  >
                    Tandai Sebagai Dibaca
                  </Button>
                )}
                <Button
                  onClick={() => handleDeleteNotif(notif?.id)}
                  className="bg-transparent text-black border hover:text-white hover:bg-red-500"
                >
                  Hapus Notifikasi
                </Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      ))}
    </>
  );
}
