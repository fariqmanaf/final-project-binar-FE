import { createLazyFileRoute, useNavigate } from '@tanstack/react-router';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { motion } from 'framer-motion';
import Navbar from '../../components/Navbar';
import toast, { Toaster } from 'react-hot-toast';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { verifOTP, resendOTP } from '@/Services/auth/otp/';
import { useMutation } from '@tanstack/react-query';
import { useState, useEffect } from 'react';

export const Route = createLazyFileRoute('/auth/otp')({
  component: InputOTPForm,
});

function InputOTPForm() {
  const email = localStorage.getItem('email');

  const FormSchema = z.object({
    pin: z.string().min(6, {
      message: 'Your one-time password must be 6 characters.',
    }),
  });

  const navigate = useNavigate();
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pin: '',
    },
  });

  const [timer, setTimer] = useState(10);
  const [isTimerRunning, setIsTimerRunning] = useState(true);

  const { mutate: verifOTPMutation } = useMutation({
    mutationFn: (data) => verifOTP(data),
    onSuccess: () => {
      localStorage.removeItem('email');
      navigate({ to: '/auth/login' });
    },
    onError: (err) => {
      toast.error(err?.message);
    },
  });

  const { mutate: resendOTPMutation } = useMutation({
    mutationFn: (otp) => resendOTP(otp),
    onSuccess: () => {
      toast.success('OTP berhasil dikirim ulang');
    },
    onError: (err) => {
      toast.error(err?.message);
    },
  });

  useEffect(() => {
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
    resendOTPMutation(email);
  };

  const onSubmit = (values) => {
    const data = {
      otp: values.pin,
      email: email,
    };

    verifOTPMutation(data);
  };

  return (
    <div>
      <Toaster position="top-right" reverseOrder={false} />
      <Navbar version={2} isLoggedIn={false} />
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
            onClick={() => navigate({ to: `/auth/register` })}
          />
          <h1 className="text-2xl font-bold mb-4">Masukkan OTP</h1>
          <FormField
            control={form.control}
            name="pin"
            render={({ field }) => (
              <FormItem className="flex flex-col items-center">
                <FormLabel className="text-center mb-4 font-light text-sm">
                  Ketik 6 digit kode yang dikirimkan ke <span className="font-bold">{email}</span>
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
            className="w-full py-2 px-4 bg-[#7126B5] text-white font-bold rounded-lg shadow-md hover:bg-[#A06ECE] focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105 duration-300"
          >
            Simpan
          </button>
        </motion.form>
      </Form>
    </div>
  );
}

export default InputOTPForm;
