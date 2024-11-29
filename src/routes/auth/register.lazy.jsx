import React from 'react';
import { createLazyFileRoute, useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Link } from '@tanstack/react-router';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { set, z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useDispatch, useSelector } from 'react-redux';
import { useMutation } from '@tanstack/react-query';
import toast, { Toaster } from 'react-hot-toast';
import { setToken } from '@/redux/slices/auth';
import ReactLoading from 'react-loading';
import { register } from '@/Services/auth/auth';
import { motion } from 'motion/react';

export const Route = createLazyFileRoute('/auth/register')({
  component: Register,
});

function Register() {
  const navigate = useNavigate();

  const { token } = useSelector((state) => state.auth);

  if (token) {
    navigate({ to: '/' });
  }

  const { mutate: registerMutation, isPending: isPendingMutate } = useMutation({
    mutationFn: (body) => register(body),
    onSuccess: () => {
      toast.success('Registrasi berhasil, silahkan cek email untuk verifikasi', {
        duration: 4000,
      });

      setTimeout(() => {
        navigate({ to: '/auth/otp' });
      }, 4000);
    },
    onError: (err) => {
      localStorage.removeItem('email');
      toast.error(err?.message);
    },
  });

  const formSchema = z
    .object({
      newName: z
        .string()
        .min(2, { message: 'Nama minimal 2 karakter' })
        .nonempty({ message: 'Nama Lengkap diperlukan' }),
      newEmail: z.string().email('Email tidak valid').nonempty({ message: 'Email diperlukan' }),
      newPhoneNumber: z
        .string()
        .regex(/^\+62\d+$/, { message: 'Nomor Telepon harus berupa angka' })
        .min(10, { message: 'Nomor Telepon minimal 10 karakter' })
        .nonempty({ message: 'Nomor Telepon diperlukan' }),
      newPassword: z
        .string()
        .min(8, { message: 'Password minimal 8 karakter' })
        .nonempty({ message: 'Password diperlukan' }),
    })
    .nonstrict();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      newName: '',
      newEmail: '',
      newPhoneNumber: '',
      newPassword: '',
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
    localStorage.setItem('email', values.newEmail);

    const data = {
      name: values.newName,
      email: values.newEmail,
      phoneNumber: values.newPhoneNumber,
      password: values.newPassword,
    };

    registerMutation(data);
  }

  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <main className="bg-[white] h-screen flex items-center justify-center">
        <div className="grid w-full h-full grid-cols-1 bg-white md:grid-cols-2">
          <div className="relative hidden md:block">
            <img className="object-cover w-screen h-screen" src="/side-picture.svg" alt="background image" />
          </div>
          <div className="flex items-center justify-center flex-col">
            <motion.div className="w-2/3" initial="hidden" animate="show" variants={containerVariants}>
              <motion.div variants={childVariants}>
                <h1 className="text-2xl font-bold mb-6">Daftar</h1>
              </motion.div>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-2 md:gap-5">
                  <motion.div variants={childVariants}>
                    <FormField
                      control={form.control}
                      name="newName"
                      render={({ field }) => (
                        <FormItem className="">
                          <FormLabel
                            htmlFor="newName"
                            className={form.formState.isSubmitted ? 'mb-1' : 'mb-1 text-black'}
                          >
                            Nama
                          </FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input
                                {...field}
                                id="newName"
                                placeholder="Nama Lengkap"
                                className={`p-3 ps-5 border rounded-xl ${
                                  form.formState.errors.newName && form.formState.isSubmitted
                                    ? 'border-red-500 border-2'
                                    : ''
                                }`}
                              />
                              {form.formState.isSubmitted && (
                                <button disabled className="absolute inset-y-0 right-0 pr-3 flex items-center">
                                  <img
                                    src={form.formState.errors.newName ? '/Vector.svg' : '/mdi_check-circle.svg'}
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
                      name="newEmail"
                      render={({ field }) => (
                        <FormItem className="">
                          <FormLabel
                            htmlFor="newEmail"
                            className={form.formState.isSubmitted ? 'mb-1' : 'mb-1 text-black'}
                          >
                            Email
                          </FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input
                                {...field}
                                id="newEmail"
                                placeholder="Contoh: johndee@gmail.com"
                                className={`p-3 ps-5 border rounded-xl ${
                                  form.formState.errors.newEmail && form.formState.isSubmitted
                                    ? 'border-red-500 border-2'
                                    : ''
                                }`}
                              />
                              {form.formState.isSubmitted && (
                                <button disabled className="absolute inset-y-0 right-0 pr-3 flex items-center">
                                  <img
                                    src={form.formState.errors.newEmail ? '/Vector.svg' : '/mdi_check-circle.svg'}
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
                      name="newPhoneNumber"
                      render={({ field }) => (
                        <FormItem className="">
                          <FormLabel
                            htmlFor="newPhoneNumber"
                            className={form.formState.isSubmitted ? 'mb-1' : 'mb-1 text-black'}
                          >
                            Nomor Telepon
                          </FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input
                                {...field}
                                type="text"
                                id="newPhoneNumber"
                                placeholder="+6281.."
                                className={`p-3 ps-5 border rounded-xl ${
                                  form.formState.errors.newPhoneNumber && form.formState.isSubmitted
                                    ? 'border-red-500 border-2'
                                    : ''
                                }`}
                              />
                              {form.formState.isSubmitted && (
                                <button disabled className="absolute inset-y-0 right-0 pr-3 flex items-center">
                                  <img
                                    src={form.formState.errors.newPhoneNumber ? '/Vector.svg' : '/mdi_check-circle.svg'}
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
                      name="newPassword"
                      render={({ field }) => (
                        <FormItem className="">
                          <FormLabel
                            htmlFor="newPassword"
                            className={form.formState.isSubmitted ? 'mb-1' : 'mb-1 text-black'}
                          >
                            Password
                          </FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input
                                {...field}
                                id="newPassword"
                                placeholder="Buat Password"
                                className={`p-3 ps-5 border rounded-xl ${
                                  form.formState.errors.newPassword && form.formState.isSubmitted
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
                                    : 'absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5'
                                }
                                onClick={() => setShowPassword(!showPassword)}
                              >
                                <img src="/fi_eye.svg" alt="" />
                              </button>
                              {form.formState.isSubmitted && (
                                <button disabled className="absolute inset-y-0 right-0 pr-3 flex items-center">
                                  <img
                                    src={form.formState.errors.newPassword ? '/Vector.svg' : '/mdi_check-circle.svg'}
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
                        <p>Daftar</p>
                      )}
                    </Button>
                  </motion.div>
                </form>
              </Form>
              <motion.div variants={childVariants}>
                <p className="mt-16 justify-center flex">
                  Sudah punya akun?&nbsp;{' '}
                  <Link to={'/auth/login'} className="text-[#7126B5] font-bold">
                    Masuk di sini
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

export default Register;
