import React from 'react';
import { Separator } from '@/components/ui/separator';

export function Notification({ notifications }) {
  return (
    <>
      {notifications.map((notif) => (
        <div key={notif.id} className="bg-white p-4 ">
          <div className="flex flex-col md:flex-row justify-between items-start">
            <div className="w-fit flex items-start">
              <img src="/notifications.svg" alt="notification" className="cursor-pointer" />
            </div>
            <div className=" w-full flex-grow ml-0 md:ml-4 mt-2 md:mt-0">
              <div className="flex justify-between items-center md:items-start">
                <span className="text-[#8A8A8A] text-[14px]">{notif.type}</span>
                <span className="text-[#8A8A8A] text-[14px] text-sm md:ml-4">
                  {new Date(notif.date).toLocaleString()}
                </span>
              </div>
              <p className="text-black text-[16px]">{notif.message}</p>
              <p className="text-[#8A8A8A] text-[14px]">{notif.details}</p>
            </div>
          </div>
          <Separator orientation="horizontal" className="w-full h-[1px] mt-2" />
        </div>
      ))}
    </>
  );
}
