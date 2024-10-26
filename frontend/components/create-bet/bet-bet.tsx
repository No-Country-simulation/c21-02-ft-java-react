"use client";
import { BetContext } from "@/context/create-bet";
import { useContext, useEffect, useState } from "react";
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
import * as SelectPrimitive from "@radix-ui/react-select"
import {
  CaretSortIcon,
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@radix-ui/react-icons"

import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { createLobby, getEvents } from "@/store/actions/lobbyActions";
import { SportEvent } from "@/types/lobby";

const formSchema = z.object({
  password: z
    .string()
    .min(8, {
      message: "La contraseña debe contener al menos 8 caracteres",
    })
    .optional(),
  bet: z.enum(["100", "500", "1000", "2000", "5000", "10000"]),
  eventId: z.string(),
  ownerBet: z.string(),
  roomName: z.string().min(3, {
    message: "El nombre de la sala debe contener al menos 3 caracteres."
  }).max(32, {
    message: "El nombre de la sala debe contener máximo 32 caracteres."
  }),
  maxUsers: z.number(),
  privateRoom: z.boolean()
});

export default function BetBet() {

  const [event, setEvent] = useState<SportEvent>();
  const [token, setToken] = useState<string>();

  const dispatch = useAppDispatch();
  const user = useAppSelector(store => store.user)
  const events = useAppSelector(store => store.lobby.events)

  const { setStep, step, betSettings } = useContext(BetContext);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      roomName: "",
      password: "",
      maxUsers: 4,
      privateRoom: false
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const roomName = values.roomName
    const bet = values.bet
    const maxUsers = values.maxUsers
    const privateRoom = betSettings.room === "private"
    const ownerBet = values.ownerBet
    const eventId = values.eventId

    dispatch(createLobby({
      roomName,
      bet,
      maxUsers,
      privateRoom,
      ownerBet,
      eventId,
      token: token ? token : ""
    }))
  }

  const onError = (errors: any) => {
    console.log("Form errors:", errors);
  };

  useEffect(() => {
    const token = user.token ?
      user.token : localStorage.getItem('token') ?
        localStorage.getItem('token') : null;

    if (token) {
      dispatch(getEvents(token))
      setToken(token)
      return
    }
    alert("No estás autorizado.");
  }, [dispatch, user.token, event])

  if (step !== 3) return null;

  return (
    <>
      <Fade triggerOnce>
        <section className="flex flex-col items-center justify-center">
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
                  name="roomName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nombre de la sala</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
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
                  name="eventId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Evento</FormLabel>
                      <SelectPrimitive.Root
                        value={field.value}
                        onValueChange={(value: string) => {
                          field.onChange(value);
                          const selectedEvent = events.find(event => event.id.toString() === value);
                          if (selectedEvent) {
                            setEvent(selectedEvent);
                          }
                        }}
                      >
                        <SelectPrimitive.Trigger className="flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1">
                          <SelectPrimitive.Value placeholder="Selecciona un evento" />
                          <SelectPrimitive.Icon asChild>
                            <CaretSortIcon className="h-4 w-4 opacity-50" />
                          </SelectPrimitive.Icon>
                        </SelectPrimitive.Trigger>

                        <SelectContent position="popper">
                          {events.map((event) => (
                            <SelectItem key={event.id} value={event.id.toString()}>
                              {event.eventName} - {event.description}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </SelectPrimitive.Root>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Separator />

                <FormField
                  control={form.control}
                  name="ownerBet"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>El ganador será:</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className={event?.id ? "" : "text-neutral-500"}>
                            <SelectValue placeholder={event?.id ? "Tu apuesta es para" : "Selecciona un evento primero."} />
                          </SelectTrigger>
                        </FormControl>
                        {
                          event ?
                            <SelectContent>
                              <SelectItem value="TEAM1_WIN">{event.team1}</SelectItem>
                              <SelectItem value="TEAM2_WIN">{event.team2}</SelectItem>
                            </SelectContent>
                            : null
                        }
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
