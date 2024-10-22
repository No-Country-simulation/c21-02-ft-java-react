"use client";
import { BetContext } from "@/context/create-bet";
import { useContext } from "react";
import { Fade } from "react-awesome-reveal";
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
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Separator } from "../ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
  password: z
    .string()
    .min(3, {
      message: "La contraseña debe contener al menos 3 caracteres",
    })
    .optional(),
  bet: z.enum(["100", "500", "1000", "2000", "5000", "10000"]),
  league: z.string(),
  winner: z.string()
});

export default function BetBet() {
  const { setStep, step, betSettings } = useContext(BetContext);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  const onError = (errors: any) => {
    console.log("Form errors:", errors);
  };

  if (step !== 3) return null;

  return (
    <>
      <Fade triggerOnce>
        <section className="flex flex-col items-center justify-center py-20">
          <div className="text-center font-black text-4xl mb-3 text-primary">
            Comienza a jugar con Super Apuestas
          </div>
          <div className="text-center font-black text-4xl mb-8">
            Configura el resto de la sala
          </div>
          <div className="flex justify-center items-center max-w-xl mx-auto w-full overflow-auto px-3">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit, onError)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem hidden={betSettings.room === "public"}>
                      <FormLabel>Contraseña de la sala</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormDescription>
                        Tendrás que compartir esta contraseña a tus amigos
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Separator />

                <FormField
                  control={form.control}
                  name="league"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Liga</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecciona una liga" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="1">
                            UEFA Champions League
                          </SelectItem>
                          <SelectItem value="2">Premier League</SelectItem>
                          <SelectItem value="3">Serie A</SelectItem>
                          <SelectItem value="4">Superliga Argentina</SelectItem>
                          <SelectItem value="5">Copa Libertadores</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Separator />

                <FormField
                  control={form.control}
                  name="league"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Partido</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecciona un partido" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="1">
                            Real Madrid vs Atletico Madrid
                          </SelectItem>
                          <SelectItem value="2">
                            Juventus vs AC Milan
                          </SelectItem>
                          <SelectItem value="3">
                            Boca Juniors vs River Plate
                          </SelectItem>
                          <SelectItem value="4">Ajax vs PSV</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Separator />

                <FormField
                  control={form.control}
                  name="winner"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>El ganador será</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Tu apuesta es para" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="1">AC Milan</SelectItem>
                          <SelectItem value="2">Juventus</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="bet"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Puja de</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Costo de entrada" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="100">100 créditos</SelectItem>
                          <SelectItem value="500">500 créditos</SelectItem>
                          <SelectItem value="1000">1,000 créditos</SelectItem>
                          <SelectItem value="2000">2,000 créditos</SelectItem>
                          <SelectItem value="5000">5,000 créditos</SelectItem>
                          <SelectItem value="10000">10,000 créditos</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormDescription>
                  Los créditos se deducirán al iniciar la apuesta, pero se
                  reembolsarán si nadie participa al finalizar la puja. En caso
                  de ganar, los créditos se añadirán automáticamente.
                </FormDescription>
                <div className="flex flex-row justify-between">
                  <Button type="submit">Comenzar</Button>
                  <Button
                    type="button"
                    onClick={() => setStep(2)}
                    className="bg-neutral-500 dark:text-white"
                  >
                    Volver
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </section>
      </Fade>
    </>
  );
}
