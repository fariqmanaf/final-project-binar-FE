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
import toast from 'react-hot-toast';
import { setToken } from '@/redux/slices/auth';

export const Route = createLazyFileRoute('/auth/login')({
  component: Login,
});

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Cek apakah sudah ada token di Redux
  const { token } = useSelector((state) => state.auth);
  console.log('Token from Redux:', token); // Log token untuk debugging
  if (token) {
    navigate({ to: '/' }); // Jika sudah ada token, arahkan ke homepage
  }

  const { mutate: loginMutation } = useMutation({
    mutationFn: (body) => {
      console.log('Logging in with:', body); // Log data login untuk debugging
      return login(body); // Pastikan fungsi login mengembalikan promise yang benar
    },
    onSuccess: (data) => {
      console.log('Login berhasil, token:', data?.token);
      localStorage.setItem('token', data?.token); // Simpan token ke localStorage
      dispatch(setToken(data?.token)); // Set token ke Redux
      navigate({ to: '/' });
    },

    onError: (err) => {
      console.error('Login gagal:', err);
      localStorage.removeItem('email'); // Hapus email dari localStorage jika login gagal
      toast.error(err?.message); // Tampilkan pesan error
    },
  });

  // Schema validasi menggunakan Zod
  const formSchema = z
    .object({
      email: z.string().email('Email tidak valid').nonempty({ message: 'Email diperlukan!' }),
      password: z.string().nonempty({ message: 'Password diperlukan!' }),
    })
    .nonstrict();

  // Setup form dengan react-hook-form dan resolver Zod
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange',
  });

  // Fungsi untuk meng-handle submit form
  async function onSubmit(values) {
    console.log('Form submitted with:', values); // Log data form untuk debugging
    localStorage.setItem('email', values.email); // Simpan email di localStorage
    const data = {
      email: values.email,
      password: values.password,
    };

    loginMutation(data); // Panggil mutasi login
  }

  const [showPassword, setShowPassword] = React.useState(false); // Menyembunyikan/memunculkan password

  return (
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
                              <img src={form.formState.errors.email ? '/Vector.svg' : '/mdi_check-circle.svg'} alt="" />
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
                        <Link to="/auth/password-reset/verify-email" className="text-sm text-[#7126B5] hover:underline">
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
                  Masuk
                </Button>
              </form>
            </Form>
            <p className="mt-16 justify-center flex">
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
  );
}
