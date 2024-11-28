import * as React from 'react';
import { createLazyFileRoute, useNavigate } from '@tanstack/react-router';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Link } from '@tanstack/react-router';
import { motion } from 'motion/react';
import { useDispatch, useSelector } from 'react-redux';
import { useMutation } from '@tanstack/react-query';
import { login } from '@/Services/auth/auth';
import toast, { Toaster } from 'react-hot-toast';
import { setToken, setUser } from '@/redux/slices/auth';
import { useEffect, useState } from 'react';
import ReactLoading from 'react-loading';

export const Route = createLazyFileRoute('/auth/login')({
  component: Login,
});

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token = useSelector((state) => state.auth.token);
  const [showPassword, setShowPassword] = useState(false);

  const { mutate: loginMutation, isPending: isPendingMutate } = useMutation({
    mutationFn: (body) => {
      return login(body);
    },
    onSuccess: (data) => {
      localStorage.setItem('token', data?.token);
      dispatch(setToken(data?.token));
      dispatch(setUser(data));
      navigate({ to: '/' });
    },

    onError: (err) => {
      localStorage.removeItem('email');
      toast.error(err?.message);
    },
  });

  useEffect(() => {
    if (token) {
      navigate({ to: '/' });
    }
  }, [token, navigate]);

  const formSchema = z.object({
    emailOrPhone: z.string().min(10, {
      message: 'Email atau nomor telepon minimal 10 karakter',
    }),
    password: z.string().min(8, {
      message: 'Password minimal 8 karakter',
    }),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      emailOrPhone: '',
      password: '',
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
    const data = {
      email: values.email,
      password: values.password,
    };

    loginMutation(data);
  }

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <main className="bg-[white] h-screen flex items-center justify-center">
        <div className="grid w-full h-full grid-cols-1 bg-white md:grid-cols-2">
          <div className="relative hidden md:block">
            <img src="/side-picture.svg" alt="background image" className="object-cover w-screen h-screen" />
          </div>
          <div className="flex items-center justify-center flex-col">
            <motion.div className="w-2/3" initial="hidden" animate="show" variants={containerVariants}>
              <h1 className="text-2xl font-bold mb-6">Masuk</h1>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5">
                  <motion.div variants={childVariants}>
                    <FormField
                      control={form.control}
                      name="emailOrPhone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel
                            htmlFor="emailOrPhone"
                            className={form.formState.isSubmitted ? 'mb-1' : 'mb-1 text-black'}
                          >
                            Email/No Telepon
                          </FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input
                                {...field}
                                id="emailOrPhone"
                                placeholder="Masukkan email atau nomor telepon anda"
                                className={`p-3 ps-5 border rounded-xl ${
                                  form.formState.errors.emailOrPhone && form.formState.isSubmitted
                                    ? 'border-red-500 border-2'
                                    : ''
                                }`}
                              />
                              {form.formState.isSubmitted && (
                                <button disabled className="absolute inset-y-0 right-0 pr-3 flex items-center">
                                  <img
                                    src={form.formState.errors.emailOrPhone ? '/Vector.svg' : '/mdi_check-circle.svg'}
                                    alt=""
                                  />
                                </button>
                              )}
                            </div>
                          </FormControl>
                          <FormMessage className={form.formState.isSubmitted ? 'visible' : 'hidden'} />
                        </FormItem>
                      )}
                    />
                  </motion.div>
                  <motion.div variants={childVariants}>
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel
                            htmlFor="password"
                            className={form.formState.isSubmitted ? 'mb-1' : 'mb-1 text-black'}
                          >
                            Password
                          </FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input
                                {...field}
                                id="password"
                                placeholder="Masukkan password anda"
                                className={`p-3 ps-5 border rounded-xl ${
                                  form.formState.errors.password && form.formState.isSubmitted
                                    ? 'border-red-500 border-2'
                                    : ''
                                }`}
                                type={showPassword ? 'text' : 'password'}
                              />
                              <button
                                type="button"
                                className={
                                  form.formState.isSubmitted
                                    ? 'absolute inset-y-0 right-0 pr-12 flex items-center text-sm leading-5'
                                    : 'absolute inset-y-0 right-0 pr-3 flex-center text-sm leading-5'
                                }
                                onClick={() => setShowPassword(!showPassword)}
                              >
                                <img src="/fi_eye.svg" alt="" />
                              </button>
                              {form.formState.isSubmitted && (
                                <button disabled className="absolute inset-y-0 right-0 pr-3 flex items-center">
                                  <img
                                    src={form.formState.errors.password ? '/Vector.svg' : 's/mdi_check-circle.svg'}
                                    alt=""
                                  />
                                </button>
                              )}
                            </div>
                          </FormControl>
                          <FormMessage className={form.formState.isSubmitted ? 'visible' : 'hidden'} />
                        </FormItem>
                      )}
                    />
                  </motion.div>
                  <motion.div variants={childVariants}>
                    <Button
                      type="submit"
                      className="w-full rounded-xl mt-3 bg-[#7126B5] h-12 hover:bg-[#4c0f85]"
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
                        <p>Masuk</p>
                      )}
                    </Button>
                  </motion.div>
                </form>
              </Form>
              <motion.div variants={childVariants}>
                <p className="mt-12 justify-center flex">
                  Belum punya akun?&nbsp;{' '}
                  <Link to={'/auth/register'} className="text-[#7126B5] font-bold">
                    Daftar di sini
                  </Link>
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </main>
    </>
  );
}
