import React from "react";
import { createLazyFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export const Route = createLazyFileRoute("/register")({
  component: Register,
});

function Register() {
  const formSchema = z
    .object({
      newName: z
        .string()
        .min(2, { message: "Nama minimal 2 karakter" })
        .nonempty({ message: "Nama Lengkap diperlukan" }),
      newEmail: z
        .string()
        .email("Email tidak valid")
        .nonempty({ message: "Email diperlukan" }),
      newPhoneNumber: z
        .string()
        .regex(/^\d+$/, { message: "Nomor Telepon harus berupa angka" })
        .min(10, { message: "Nomor Telepon minimal 10 karakter" })
        .nonempty({ message: "Nomor Telepon diperlukan" }),
      newPassword: z
        .string()
        .min(8, { message: "Password minimal 8 karakter" })
        .nonempty({ message: "Password diperlukan" }),
    })
    .nonstrict();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      newName: "",
      newEmail: "",
      newPhoneNumber: "",
      newPassword: "",
    },
    mode: "onChange",
  });

  async function onSubmit(values) {
    console.log(values);
  }

  const [showPassword, setShowPassword] = React.useState(false);
  const [daftar, setDaftar] = React.useState(false);

  return (
    <main className="bg-[white] h-screen flex items-center justify-center">
      <div className="grid w-full h-full grid-cols-1 bg-white md:grid-cols-2">
        <div className="relative hidden md:block">
          <img
            className="object-cover w-screen h-screen"
            src="./src/assets/side-picture.svg"
            alt="background image"
          />
        </div>
        <div className="flex items-center justify-center flex-col">
          <div className="w-2/3">
            <h1 className="text-3xl font-bold mb-6">Daftar</h1>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col gap-5"
              >
                <FormField
                  control={form.control}
                  name="newName"
                  render={({ field }) => (
                    <FormItem className="">
                      <FormLabel htmlFor="newName" className="mb-1">
                        Nama
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            {...field}
                            id="newName"
                            placeholder="Nama Lengkap"
                            className="p-3 ps-5 border rounded-xl"
                          />
                          {!form.formState.touchedFields.newName ||
                          !form.formState.dirtyFields.newName ? null : (
                            <button
                              disabled
                              className="absolute inset-y-0 right-0 pr-3 flex items-center"
                            >
                              <img
                                src={
                                  form.formState.errors.newName
                                    ? "src/assets/Vector.svg"
                                    : "src/assets/mdi_check-circle.svg"
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
                  name="newEmail"
                  render={({ field }) => (
                    <FormItem className="">
                      <FormLabel htmlFor="newEmail" className="mb-1">
                        Email
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            {...field}
                            id="newEmail"
                            placeholder="Contoh: johndee@gmail.com"
                            className="p-3 ps-5 border rounded-xl"
                          />
                          {!form.formState.touchedFields.newEmail ||
                          !form.formState.dirtyFields.newEmail ? null : (
                            <button
                              disabled
                              className="absolute inset-y-0 right-0 pr-3 flex items-center"
                            >
                              <img
                                src={
                                  form.formState.errors.newEmail
                                    ? "src/assets/Vector.svg"
                                    : "src/assets/mdi_check-circle.svg"
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
                  name="newPhoneNumber"
                  render={({ field }) => (
                    <FormItem className="">
                      <FormLabel htmlFor="newPhoneNumber" className="mb-1">
                        Nomor Telepon
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            {...field}
                            id="newPhoneNumber"
                            placeholder="081.."
                            className="p-3 ps-5 border rounded-xl"
                          />
                          {!form.formState.touchedFields.newPhoneNumber ||
                          !form.formState.dirtyFields.newPhoneNumber ? null : (
                            <button
                              disabled
                              className="absolute inset-y-0 right-0 pr-3 flex items-center"
                            >
                              <img
                                src={
                                  form.formState.errors.newPhoneNumber
                                    ? "src/assets/Vector.svg"
                                    : "src/assets/mdi_check-circle.svg"
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
                  name="newPassword"
                  render={({ field }) => (
                    <FormItem className="">
                      <FormLabel htmlFor="newPassword" className="mb-1">
                        Password
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            {...field}
                            id="newPassword"
                            placeholder="Password"
                            className="p-3 ps-5 border rounded-xl"
                            type={showPassword ? "text" : "password"}
                          />

                          <button
                            type="button"
                            className={
                              !form.formState.touchedFields.newPassword
                                ? "absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                                : "absolute inset-y-0 right-0 pr-12 flex items-center text-sm leading-5"
                            }
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            <img src="src\assets\fi_eye.svg" alt="" />
                          </button>
                          {!form.formState.touchedFields.newPassword ||
                          !form.formState.dirtyFields.newPassword ? null : (
                            <button
                              disabled
                              className="absolute inset-y-0 right-0 pr-3 flex items-center"
                            >
                              <img
                                src={
                                  form.formState.errors.newPassword
                                    ? "src/assets/Vector.svg"
                                    : "src/assets/mdi_check-circle.svg"
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
                  disabled={!form.formState.isValid || daftar}
                  onClick={() => setDaftar(!daftar)}
                >
                  Daftar
                </Button>
              </form>
            </Form>
            <p className="mt-16 justify-center flex">
              Sudah punya akun?&nbsp;{" "}
              <Link to={"/login"} className="text-[#7126B5] font-bold">
                Masuk di sini
              </Link>
            </p>
          </div>
          {!form.formState.touchedFields &&
          !form.formState.dirtyFields ? null : (
            <div className="flex justify-center mt-6">
              {form.formState.errors.newName ? (
                <div className="py-4 px-10 border rounded-xl text-[white] bg-[red]">
                  {form.formState.errors.newName.message}
                </div>
              ) : form.formState.errors.newEmail ? (
                <div className="py-4 px-10 border rounded-xl text-[white] bg-[red]">
                  {form.formState.errors.newEmail.message}
                </div>
              ) : form.formState.errors.newPhoneNumber ? (
                <div className="py-4 px-10 border rounded-xl text-[white] bg-[red]">
                  {form.formState.errors.newPhoneNumber.message}
                </div>
              ) : form.formState.errors.newPassword ? (
                <div className="py-4 px-10 border rounded-xl text-[white] bg-[red]">
                  {form.formState.errors.newPassword.message}
                </div>
              ) : daftar ? (
                <div className="py-4 px-10 border rounded-xl text-[white] bg-[green]">
                  Tautan Verifikasi telah dikirim!
                </div>
              ) : null}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
