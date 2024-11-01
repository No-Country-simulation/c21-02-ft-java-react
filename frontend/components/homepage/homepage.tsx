"use client";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Fade, Slide, Zoom } from "react-awesome-reveal";
import EventsCards from "@/components/EventsCards/EventsCards";
import { useRouter } from "next/navigation";

interface HomepageProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export default function Homepage({ className, ...rest }: HomepageProps) {

  const router = useRouter();

  const [componentRendered, setComponentRendered] = useState<boolean>(false);

  useEffect(() => {
    setComponentRendered(true)
  }, [])

  return (
    <>
      <div {...rest} className={cn(className, "mt-10")}>
        <section className="min-h-dvh flex flex-col">
          <div>
            <Fade>
              <Slide direction="down" triggerOnce>
                <div className="text-center font-black text-5xl mb-3">
                  Super Apuestas
                </div>
              </Slide>
            </Fade>
            <Fade triggerOnce>
              <div className="text-center max-w-[500px] mx-auto text-sm px-3">
                Más de 400 Juegos Diferentes y una Gran Variedad de Deportes para
                apuestas deportivas. Recibe tus depósitos en menos de 1 hora.
                Apuesta en vivo. Retiros al Momento.
              </div>
            </Fade>
          </div>
          {
            componentRendered ?
              <EventsCards />
              : null
          }
        </section>
        <Fade triggerOnce>
          <section className="min-h-screen flex flex-col items-center justify-center bg-primary text-primary-foreground py-20">
            <div className="text-center font-black text-4xl mb-3 text-primary-foreground/80">
              Comienza a jugar con Super Apuestas
            </div>
            <div className="text-center font-black text-4xl mb-3">
              Elije un evento
            </div>
            <div className="flex max-md:flex-col max-md:flex-wrap justify-center items-center max-md:w-screen md:max-w-5xl mx-auto">
              <Slide direction="left" triggerOnce>
                <div className="p-3">
                  <Image
                    onClick={() => router.push('/nueva-apuesta')}
                    src={"/betcris-ligas_eu-img.png"}
                    alt=""
                    width={450}
                    height={450}
                    className="object-scale-down max-md:w-screen md:size-[500px] hover:-translate-y-10 animation duration-200 hover:cursor-pointer"
                  />
                  <p className="md:text-3xl">Disfruta lo mejor del <span className="md:text-6xl font-bold">FÚTBOL</span></p>
                  <p className="md:text-xl">
                    <span className="font-bold">¡Celebra cada gol </span>de tu
                    equipo favorito!
                  </p>
                </div>
              </Slide>

              <Slide direction="right" triggerOnce>
                <div className="p-3">
                  <Image
                    onClick={() => router.push('/nueva-apuesta')}
                    src={"/bectris-homebanner-img-des.png"}
                    alt=""
                    width={450}
                    height={450}
                    className="object-scale-down max-md:w-screen md:size-[500px] hover:-translate-y-10 animation duration-200 hover:cursor-pointer"
                  />

                  <p className="md:text-3xl md:text-end">
                    Juegos de azar
                    <span className="md:text-6xl font-bold md:text-end"> COINFLIP</span>
                  </p>
                  <p className="md:text-xl md:text-end">
                    <span className="font-bold">¿Te sientes con suerte? </span>
                  </p>
                </div>
              </Slide>
            </div>
          </section>
        </Fade>

        <Fade triggerOnce>
          <section className="min-h-screen bg-muted py-20 flex items-center justify-center">
            <Zoom triggerOnce>
              <div className="flex flex-col items-center justify-center gap-4">
                <div className="text-center font-black text-4xl mb-3">
                  ¿Por qué Super Apuestas?
                </div>
                <div className="border-4 border-muted-foreground rounded-full size-40 flex items-center justify-center my-3">
                  <span className="font-bold text-5xl italic text-muted-foreground">
                    +20
                  </span>
                </div>

                <div className="max-md:text-center text-3xl italic font-medium text-muted-foreground/90">
                  +20 AÑOS DE TRAYECTORIA
                </div>
                <div className="text-xl font-medium text-muted-foreground/60">
                  Lideres en Latinoamérica
                </div>
                <div className="font-medium max-md:text-center">
                  Super Apuestas ha logrado consolidarse como una de las
                  compañías más fiables y legítimas de la industria.
                </div>
              </div>
            </Zoom>
          </section>
        </Fade>

        <Fade triggerOnce>
          <section className="max-md:flex-wrap min-h-screen flex items-center justify-center px-10 max-md:mb-8">
            <Fade delay={500} triggerOnce>
              <div className="text-center">
                <div className="text-primary font-black text-4xl mb-5">
                  RETIROS Y DEPÓSITOS
                </div>
                <div className="font-medium">
                  Deposita, cobra fácil y rápido
                </div>
                <div className="font-medium">
                  Variedad de opciones en nuestro{" "}
                  <span className="font-bold">Cajero en Línea</span>
                </div>

                <div className="max-lg:flex-wrap flex gap-2 mt-10 justify-center">
                  <Image
                    src={"/logo-payment-visa.svg"}
                    alt=""
                    width={120}
                    height={120}
                    className="object-scale-down"
                  />
                  <Image
                    src={"/logo-payment-mastercard.svg"}
                    alt=""
                    width={70}
                    height={70}
                    className="object-scale-down"
                  />
                  <Image
                    src={"/logo-payment-oxopay.svg"}
                    alt=""
                    width={120}
                    height={120}
                    className="object-scale-down"
                  />
                  <Image
                    src={"/logo-payment-paysafecard.svg"}
                    alt=""
                    width={120}
                    height={120}
                    className="object-scale-down"
                  />
                  <Image
                    src={"/logo-payment-spei.svg"}
                    alt=""
                    width={120}
                    height={120}
                    className="object-scale-down"
                  />
                </div>

                <div className="max-lg:flex-wrap flex mt-10 gap-3 justify-center">
                  <div>
                    <Image
                      src={"/icon-payment-kiosk.svg"}
                      alt=""
                      width={180}
                      height={180}
                    />
                    <div className="text-center mt-3">
                      <p className="text-sm">Tiendas de </p>
                      <p className="font-semibold">Conveniencia</p>
                    </div>
                  </div>

                  <div>
                    <Image
                      src={"/icon-payment-credit-cards.svg"}
                      alt=""
                      width={180}
                      height={180}
                    />
                    <div className="text-center mt-3">
                      <p className="text-sm">Crédito o Débito </p>
                    </div>
                  </div>

                  <div>
                    <Image
                      src={"/icon-payment-bank.svg"}
                      alt=""
                      width={180}
                      height={180}
                    />
                    <div className="text-center mt-3">
                      <p className="text-sm">Transferencia</p>
                      <p className="font-semibold">Bancaria</p>
                    </div>
                  </div>

                  <div>
                    <Image
                      src={"/icon-payment-card.svg"}
                      alt=""
                      width={180}
                      height={180}
                    />
                    <div className="text-center mt-3">
                      <p className="text-sm">Tarjetas</p>
                      <p className="font-semibold">Propagadas</p>
                    </div>
                  </div>
                </div>
              </div>
            </Fade>
          </section>
        </Fade>
      </div>
    </>
  );
}
