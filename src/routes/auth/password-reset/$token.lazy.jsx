import { createLazyFileRoute, useNavigate } from '@tanstack/react-router';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import * as z from 'zod';
import ReactLoading from 'react-loading';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { motion } from 'motion/react';
import { verifyToken, resetPassword } from '@/Services/auth/reset-password';
import { useQuery, useMutation } from '@tanstack/react-query';
import toast, { Toaster } from 'react-hot-toast';

export const Route = createLazyFileRoute('/auth/password-reset/$token')({
  component: ResetPassword,
});

function ResetPassword() {
  const navigate = useNavigate();
  const token = Route.useParams().token;

  const { isPending, isError, isSuccess } = useQuery({
    queryKey: ['verify-token', token],
    queryFn: () => verifyToken(token),
    enabled: !!token,
  });

  const { mutate: resetMutation, isPending: isPendingMutate } = useMutation({
    mutationFn: (values) => resetPassword(token, values.newPassword),
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      toast.success('Password berhasil direset', {
        duration: 3000,
      });

      setTimeout(() => {
        navigate({ to: '/auth/login' });
      }, 3000);
    },
  });

  useEffect(() => {
    if (isSuccess) {
      toast.success('Token berhasil diverifikasi', {
        duration: 5000,
      });
    }

    if (isError) {
      toast.error('Token Expired Atau Invalid', {
        duration: 3000,
      });
    }
  }, [isSuccess, isError]);

  const formSchema = z
    .object({
      newPassword: z.string().min(8, {
        message: 'Password minimal 8 karakter',
      }),
      verifyPassword: z.string(),
    })
    .superRefine(({ newPassword, verifyPassword }, ctx) => {
      if (newPassword !== verifyPassword) {
        ctx.addIssue({
          path: ['verifyPassword'],
          message: 'Password tidak sama',
        });
      }
    });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      newPassword: '',
      verifyPassword: '',
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

  if (isPending) {
    return (
      <div className="flex flex-col justify-center items-center h-screen w-screen">
        <ReactLoading type={'spin'} color={'#0d6efd'} height={'5%'} width={'5%'} />
      </div>
    );
  }

  async function onSubmit(values) {
    resetMutation(values);
  }

  return (
    <>
      {' '}
      <Toaster position="top-right" reverseOrder={false} />
      <div className="flex flex-row justify-center items-center min-h-screen w-full">
        <div className="hidden md:block w-1/2 h-screen bg-black">
          <img src="/side-picture.svg" alt="Side decoration" className="object-cover w-full h-full" />
        </div>
        <div className="w-full md:w-1/2 h-screen flex flex-col justify-center items-center p-4">
          <motion.div className="w-full max-w-md" initial="hidden" animate="show" variants={containerVariants}>
            <motion.div variants={childVariants}>
              <h3 className="text-2xl font-bold mb-[1rem]">Reset Password</h3>
            </motion.div>
            <Form {...form} id="form">
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                <motion.div variants={childVariants}>
                  <FormField
                    control={form.control}
                    name="newPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className={form.formState.isSubmitted ? 'mb-1' : 'mb-1 text-black'}>
                          Masukkan Password Baru
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="password"
                            className="rounded-xl"
                            onBlur={field.onBlur}
                            placeholder="Masukkan Password Barumu"
                          />
                        </FormControl>
                        <FormMessage className={form.formState.isSubmitted ? 'visible' : 'hidden'} />
                      </FormItem>
                    )}
                  />
                </motion.div>
                <motion.div variants={childVariants}>
                  <FormField
                    control={form.control}
                    name="verifyPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className={form.formState.isSubmitted ? 'mb-1' : 'mb-1 text-black'}>
                          Ulangi Password Baru
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="password"
                            className="rounded-xl"
                            onBlur={field.onBlur}
                            placeholder="Ulangi Password Barumu"
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
                    className="w-full bg-[#7126B5] hover:bg-[#4c0f85] rounded-xl"
                    disabled={!form.formState.isDirty}
                  >
                    {isPendingMutate ? (
                      <ReactLoading
                        type={'spin'}
                        color={'#FFFFFF'}
                        height={'15%'}
                        width={'15%'}
                        className="flex justify-center items-center"
                      />
                    ) : (
                      <p>Reset Password</p>
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
