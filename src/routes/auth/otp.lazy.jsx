"use client";
import * as React from "react";
import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { motion } from "framer-motion";
import Navbar from "../../components/Navbar";
import { toast } from "@/components/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

export const Route = createLazyFileRoute("/auth/otp")({
  component: InputOTPForm,
});

const FormSchema = z.object({
  pin: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
});

export function InputOTPForm() {
  const navigate = useNavigate();
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pin: "",
    },
  });

  const [timer, setTimer] = React.useState(60);
  const [isTimerRunning, setIsTimerRunning] = React.useState(true);

  React.useEffect(() => {
    if (isTimerRunning && timer > 0) {
      const intervalId = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
      return () => clearInterval(intervalId);
    } else if (timer === 0) {
      setIsTimerRunning(false);
    }
  }, [timer, isTimerRunning]);

  const handleResend = () => {
    setTimer(60);
    setIsTimerRunning(true);
    // Add your resend OTP logic here
  };

  const onSubmit = (data) => {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  };

  return (
    <div>
      <Navbar />
      <Form {...form}>
        <motion.form
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          onSubmit={form.handleSubmit(onSubmit)}
          className="bg-white p-8 space-y-6 w-full max-w-md mx-auto mt-10"
        >
          <img
            src="/arrow-left.svg"
            alt="back-button"
            className="cursor-pointer"
            onClick={() => navigate("/auth/register")}
          />
          <h1 className="text-2xl font-bold mb-4">Masukkan OTP</h1>
          <FormField
            control={form.control}
            name="pin"
            render={({ field }) => (
              <FormItem className="flex flex-col items-center">
                <FormLabel className="text-center mb-4 text-sm">
                  Ketik 6 digit kode yang dikirimkan
                </FormLabel>
                <FormControl className="flex justify-center gap-2">
                  <InputOTP {...field} maxLength={6}>
                    <InputOTPGroup className="flex space-x-2">
                      <InputOTPSlot index={0} />
                    </InputOTPGroup>
                    <InputOTPGroup className="flex space-x-2">
                      <InputOTPSlot index={1} />
                    </InputOTPGroup>
                    <InputOTPGroup className="flex space-x-2">
                      <InputOTPSlot index={2} />
                    </InputOTPGroup>
                    <InputOTPGroup className="flex space-x-2">
                      <InputOTPSlot index={3} />
                    </InputOTPGroup>
                    <InputOTPGroup className="flex space-x-2">
                      <InputOTPSlot index={4} />
                    </InputOTPGroup>
                    <InputOTPGroup className="flex space-x-2">
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
                <FormDescription className="text-center mt-4 text-sm">
                  {isTimerRunning ? (
                    <>Kirim Ulang OTP dalam {timer} detik</>
                  ) : (
                    <button onClick={handleResend} className="text-red-500">
                      Kirim Ulang
                    </button>
                  )}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <button
            type="submit"
            className="w-full py-2 px-4 bg-[#7126B5] text-white font-bold rounded-lg shadow-md hover:bg-[#A06ECE] focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300"
          >
            Simpan
          </button>
        </motion.form>
      </Form>
    </div>
  );
}
