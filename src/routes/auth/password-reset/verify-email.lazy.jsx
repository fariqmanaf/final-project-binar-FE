import { createLazyFileRoute } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import * as z from 'zod';
import ReactLoading from 'react-loading';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { motion } from 'motion/react';
import { requestEmailVerification } from '@/Services/auth/reset-password';
import { useMutation } from '@tanstack/react-query';
import toast, { Toaster } from 'react-hot-toast';
import { FaCheck } from 'react-icons/fa';

export const Route = createLazyFileRoute('/auth/password-reset/verify-email')({
  component: VerifyEmail,
});

function VerifyEmail() {
  const { mutate: verifyMutation, isPending } = useMutation({
    mutationFn: (email) => requestEmailVerification(email),
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      toast.custom(
        (t) => (
          <div
            className={`${
              t.visible ? 'animate-enter' : 'animate-leave'
            } bg-white flex justify-center items-center gap-4 shadow-2xl p-4 rounded-lg`}
          >
            <div className="w-[2rem] h-[2rem] bg-[#7126B5] rounded-full flex justify-center items-center">
              <FaCheck className="text-white" />
            </div>
            <div className="text-[#333] max-w-xs">
              <h1 className="font-semibold">Email Verifikasi Berhasil Dikirim</h1>
              <p className="text-sm">Silahkan cek email kamu untuk melanjutkan proses reset password.</p>
            </div>
          </div>
        ),
        {
          duration: 5000,
        }
      );
    },
  });

  const formSchema = z.object({
    email: z.string().email('Email tidak valid'),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
    mode: 'onChange',
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 100 },
    show: { opacity: 1, y: 0 },
  };

  async function onSubmit(values) {
    verifyMutation(values.email);
  }

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <div className="flex flex-row justify-center items-center min-h-screen w-full">
        <div className="hidden md:block w-1/2 h-screen bg-black">
          <img src="/side-picture.svg" alt="Side decoration" className="object-cover w-full h-full" />
        </div>
        <div className="w-full md:w-1/2 h-screen flex flex-col justify-center items-center p-4">
          <motion.div className="w-full max-w-md" initial="hidden" animate="show" variants={containerVariants}>
            <motion.div variants={childVariants}>
              <h3 className="text-2xl font-bold mb-[1rem]">Verify Email</h3>
            </motion.div>
            <Form {...form} id="form">
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                <motion.div variants={childVariants}>
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className={form.formState.isSubmitted ? 'mb-1' : 'mb-1 text-black'}>
                          Masukkan Email
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="email"
                            className="rounded-xl"
                            onBlur={field.onBlur}
                            placeholder="Masukkan Emailmu"
                          />
                        </FormControl>
                        <FormMessage className={form.formState.isSubmitted ? 'visible' : 'hidden'} />
                      </FormItem>
                    )}
                  />
                </motion.div>
                <motion.div variants={childVariants}>
                  <Button
                    type="submit"
                    className="w-full bg-[#7126B5] hover:bg-[#4c0f85] rounded-xl flex justify-center items-center"
                    disabled={!form.formState.isDirty}
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
                      <p>Kirim Verifikasi Email</p>
                    )}
                  </Button>
                </motion.div>
              </form>
            </Form>
          </motion.div>
        </div>
      </div>
    </>
  );
}
