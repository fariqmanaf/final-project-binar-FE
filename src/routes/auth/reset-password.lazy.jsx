import { createLazyFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { motion } from "motion/react";

export const Route = createLazyFileRoute("/auth/reset-password")({
  component: ResetPassword,
});

function ResetPassword() {
  const formSchema = z
    .object({
      newPassword: z.string().min(8, {
        message: "Password minimal 8 karakter",
      }),
      verifyPassword: z.string(),
    })
    .superRefine(({ newPassword, verifyPassword }, ctx) => {
      if (newPassword !== verifyPassword) {
        ctx.addIssue({
          path: ["verifyPassword"],
          message: "Password tidak sama",
        });
      }
    });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      newPassword: "",
      verifyPassword: "",
    },
    mode: "onChange",
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
    console.log(values);
  }

  return (
    <div className="flex flex-row justify-center items-center min-h-screen w-full">
      <div className="hidden md:block w-1/2 h-screen bg-black">
        <img
          src="/side-picture.svg"
          alt="Side decoration"
          className="object-cover w-full h-full"
        />
      </div>
      <div className="w-full md:w-1/2 h-screen flex flex-col justify-center items-center p-4">
        <motion.div
          className="w-full max-w-md"
          initial="hidden"
          animate="show"
          variants={containerVariants}
        >
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
                      <FormLabel>Masukkan Password Baru</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="password"
                          className="rounded-xl"
                          onBlur={field.onBlur}
                          placeholder="Masukkan Password Barumu"
                        />
                      </FormControl>
                      <FormMessage />
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
                      <FormLabel>Ulangi Password Baru</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="password"
                          className="rounded-xl"
                          onBlur={field.onBlur}
                          placeholder="Ulangi Password Barumu"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </motion.div>

              <motion.div variants={childVariants}>
                <Button
                  type="submit"
                  className="w-full bg-[#7126B5] hover:bg-[#4c0f85] rounded-xl"
                  disabled={!form.formState.isValid}
                >
                  Simpan
                </Button>
              </motion.div>
            </form>
          </Form>
        </motion.div>
      </div>
    </div>
  );
}
