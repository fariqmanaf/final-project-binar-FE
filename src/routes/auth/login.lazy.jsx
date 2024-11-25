import * as React from "react";
import { createLazyFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/auth/login")({
  component: Login,
});

function Login() {
  const formSchema = z
    .object({
      emailOrPhone: z
        .string()
        .nonempty({ message: "Email atau nomor telepon diperlukan! " }),
      password: z.string().nonempty({ message: "Password diperlukan!" }),
    })
    .nonstrict();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      emailOrPhone: "",
      password: "",
    },
    mode: "onChange",
  });

  async function onSubmit(values) {
    console.log(values);
  }

  const [showPassword, setShowPassword] = React.useState(false);
  const [masuk, setMasuk] = React.useState(false);

  return (
    <main className=".bg-[white].h-screen flex items-center justify-center">
      <div className="grid w-full h-full grid-cols-1 bg-white md:grid-cols-2">
        <div className="relative hidden md:block">
          <img
            src="/side-picture.svg"
            alt="background image"
            className="object-cover w-screen h-screen"
          />
        </div>
        <div className="flex items-center justify-center flex-col">
          <div className="w-2/3">
            <h1 className="text-3x1 font-bold mb-6">Masuk</h1>
            <Form {...form}>
              <form
                action=""
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col gap-5"
              >
                <FormField
                  control={form.control}
                  name="emailOrPhone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="emailOrPhone" className="mb-1">
                        Email/No Telepon
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            {...field}
                            id="emailOrPhone"
                            placeholder="Masukkan email atau nomor telepon anda"
                            className="p-3 ps-5 border rounded-xl"
                          />
                          {!form.formState.touchedFields.emailOrPhone ||
                          !form.formState.dirtyFields.emailOrPhone ? null : (
                            <button
                              disabled
                              className="absolute inset-y-0 right-0 pr-3 flex items-center"
                            >
                              <img
                                src={
                                  form.formState.errors.emailOrPhone
                                    ? "/src/assets/Vector.svg"
                                    : "/src/asset/mdi_check-circle.svg"
                                }
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
                      <FormLabel htmlFor="password" className="mb-1">
                        Password
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            {...field}
                            id="password"
                            placeholder="Masukkan password anda"
                            className="p-3 ps-5 border rounded-xl"
                            type={showPassword ? "text" : "password"}
                          />
                          <button
                            type="button"
                            className={
                              !form.formState.touchedFields.password
                                ? "absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                                : "absolute inset-y-0 right-0 pr-12 flex-center text-sm leading-5"
                            }
                          >
                            <img src="/src/assets/fi_eye.svg" alt="" />
                          </button>
                          {!form.formState.touchedFields.password ||
                          !form.formState.dirtyFields.password ? null : (
                            <button
                              disabled
                              className="absolute inset-y-0 right-0 pr-3 flex items-center"
                            >
                              <img
                                src={
                                  form.formState.errors.password
                                    ? "/src/assets/Vector.svg"
                                    : "/src/assets/mdi_check-circle.svg"
                                }
                                alt=""
                              />
                            </button>
                          )}
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="w-full rounded-xl mt-3 bg-[#7126B5] h-12 hover:bg-[#4c0f85]"
                  disabled={!form.formState.isValid || masuk}
                  onClick={() => setMasuk(!masuk)}
                >
                  Masuk
                </Button>
              </form>
            </Form>
            <p className="mt-16 justify-center flex">
              Belum punya akun?&nbsp;{" "}
              <Link to={"/auth/register"} className="text-[#7126B5] font-bold">
                Daftar di sini
              </Link>
            </p>
          </div>
          {!form.formState.touchedFields && !form.formState.dirtyFields ? null : (
            <div className="flex justify-center mt-6">
              {form.formState.errors.emailOrPhone ? (
                <div className="py-4 px-10 border rounded-xl text-[white] bg-[red]">
                  {form.formState.errors.emailOrPhone.message}
                </div>
              ) : form.formState.errors.password ? (
                <div className="py-4 px-10 border rounded-xl text-[white] bg-[red]">
                  {form.formState.errors.password.message}
                </div>
              ) : null}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
