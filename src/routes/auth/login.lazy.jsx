import * as React from 'react';
import { createLazyFileRoute, useNavigate } from '@tanstack/react-router';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Link } from '@tanstack/react-router';
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

  const formSchema = z
    .object({
      email: z.string().email('Email tidak valid').nonempty({ message: 'Email diperlukan!' }),
      password: z
        .string()
        .min(8, { message: 'Password minimal 8 karakter' })
        .nonempty({ message: 'Password diperlukan!' }),
    })
    .nonstrict();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange',
  });

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
      <main className="bg-white h-screen flex items-center justify-center">
        <div className="grid w-full h-full grid-cols-1 bg-white md:grid-cols-2">
          <div className="relative hidden md:block">
            <img src="/side-picture.svg" alt="background image" className="object-cover w-screen h-screen" />
          </div>
          <div className="flex items-center justify-center flex-col">
            <div className="w-2/3">
              <h1 className="text-3xl font-bold mb-6">Masuk</h1>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="email" className="mb-1">
                          Email
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              {...field}
                              id="email"
                              placeholder="Masukkan email anda"
                              className="p-3 ps-5 border rounded-xl"
                            />
                            {!form.formState.touchedFields.email || !form.formState.dirtyFields.email ? null : (
                              <button disabled className="absolute inset-y-0 right-0 pr-3 flex items-center">
                                <img
                                  src={form.formState.errors.email ? '/Vector.svg' : '/mdi_check-circle.svg'}
                                  alt=""
                                />
                              </button>
                            )}
                          </div>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-center justify-between">
                          <FormLabel htmlFor="password" className="mb-1">
                            Password
                          </FormLabel>
                          <Link
                            to="/auth/password-reset/verify-email"
                            className="text-sm text-[#7126B5] hover:underline"
                          >
                            Lupa Kata Sandi
                          </Link>
                        </div>
                        <FormControl>
                          <div className="relative">
                            <Input
                              {...field}
                              id="password"
                              placeholder="Masukkan password anda"
                              className="p-3 ps-5 border rounded-xl"
                              type={showPassword ? 'text' : 'password'}
                            />
                            <button
                              type="button"
                              className="absolute inset-y-0 right-0 pr-3 flex items-center"
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              <img src="/fi_eye.svg" alt="" />
                            </button>
                          </div>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <Button
                    type="submit"
                    className="w-full rounded-xl mt-3 bg-[#7126B5] h-12 hover:bg-[#4c0f85]"
                    disabled={!form.formState.isValid}
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
                </form>
              </Form>
              <p className="mt-[1rem] justify-center flex">
                Belum punya akun?&nbsp;{' '}
                <Link to="/auth/register" className="text-[#7126B5] font-bold">
                  Daftar di sini
                </Link>
              </p>
            </div>
            <div className="flex justify-center mt-6">
              {form.formState.errors.email || form.formState.errors.password ? (
                <div className="py-4 px-10 border rounded-xl text-[white] bg-[red]">
                  {form.formState.errors.email?.message || form.formState.errors.password?.message}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
