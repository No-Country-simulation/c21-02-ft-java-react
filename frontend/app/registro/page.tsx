"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Checkbox } from "@/components/ui/checkbox";
import FooterSpecial from "@/components/footer/footer-special";

import { useAppDispatch } from "@/hooks/hooks";
import { userRegister } from "@/store/actions/userActions";

const formSchema = z.object({
  name: z.string().min(3),
  email: z.string(),
  password: z.string().min(8),
  repeatPassword: z.string(),
  terms: z.boolean(),
  balance: z.number()
});

export default function Page() {

  const dispatch = useAppDispatch();

  const form = useForm<z.infer<typeof formSchema> & { userEnum: "USER" | "ADMIN" | "INVITED" }>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      repeatPassword: "",
      balance: 1000,
      userEnum: "USER"
    },
  });

  function onSubmit(values: z.infer<typeof formSchema> & { userEnum: "USER" | "ADMIN" | "INVITED" }) {
    const name = values.name
    const email = values.email
    const password = values.password
    const balance = values.balance
    const userEnum = "USER"

    if (values.password === values.repeatPassword) dispatch(userRegister({
      name,
      email,
      password,
      balance,
      userEnum
    }))
    else alert("Las contraseñas no coinciden.")
  }
  return (
    <>
      <div>
        {/* header */}
        <div
          className="bg-primary text-5xl text-primary-foreground font-semibold p-3 italic
        "
        >
          <Link href={"/"}>Super Apuestas</Link>
        </div>

        {/* form */}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 w-8/12 mx-auto mt-10"
          >
            <div className="grid grid-cols-2 gap-3">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Nombre" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Correo electrónico"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input type="password" placeholder="Contraseña" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="repeatPassword"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input type="password" placeholder="Repetir Contraseña" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="terms"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel className="text-xs">
                      Por favor confirma que eres mayor de 18 años, que aceptas
                      nuestros{" "}
                      <span className="text-primary hover:underline">
                        Términos y Condiciones
                      </span>{" "}
                      y nuestra{" "}
                      <span className="text-primary hover:underline">
                        Política de Privacidad
                      </span>
                      , y declara que actúas por cuenta propia y no de un
                      tercero.
                    </FormLabel>
                  </div>
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">
              Submit
            </Button>
          </form>
        </Form>

        <FooterSpecial />
      </div>
    </>
  );
}
