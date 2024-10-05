import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";
import { Table } from "../ui/table";

interface HomepageProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export default function Homepage({ className, ...rest }: HomepageProps) {
  return (
    <>
      <div {...rest} className={cn(className)}>
        <section className="min-h-dvh">
          <div className="text-center font-black text-5xl mb-3">
            Super Apuestas
          </div>
          <div className="text-center max-w-[500px] mx-auto text-sm px-3">
            Más de 400 Juegos Diferentes y una Gran Variedad de Deportes para
            apuestas deportivas. Recibe tus depósitos en menos de 1 hora.
            Apuesta en vivo. Retiros al Momento.
          </div>

          <Table></Table>
        </section>

        <section className="min-h-dvh flex flex-col items-center justify-center bg-primary">
          <div className="text-center font-black text-4xl mb-3 text-primary-foreground">
            Comienza a jugar con Super Apuestas
          </div>
          <div className="text-center font-black text-4xl mb-3 ">
            Elije un evento
          </div>
          <div className="flex justify-center items-center max-w-5xl mx-auto">
            <div className="p-3">
              <Image
                src={"/betcris-ligas_eu-img.png"}
                alt=""
                width={450}
                height={450}
                className="object-scale-down size-[500px] hover:-translate-y-10 animation duration-200 hover:cursor-pointer"
              />
              <p className="text-3xl">Disfruta lo mejor de las ligas</p>
              <p className="text-6xl font-bold">EUROPEAS</p>
              <p className="text-xl">
                <span className="font-bold">¡Celebra cada gol </span>de tu
                equipo favorito!
              </p>
            </div>

            <div className="p-3">
              <Image
                src={"/bectris-homebanner-img-des.png"}
                alt=""
                width={450}
                height={450}
                className="object-scale-down size-[500px] hover:-translate-y-10 animation duration-200 hover:cursor-pointer"
              />

              <p className="text-3xl text-end">Juegos de mesa espeluznantes</p>
              <p className="text-6xl font-bold text-end">BLACKJACK</p>
              <p className="text-xl text-end">
                <span className="font-bold">¿Te atreves a jugar? </span>
              </p>
            </div>
          </div>
        </section>

        <section className="min-h-dvh flex flex-col items-center justify-center bg-muted">
          <div className="text-center font-black text-4xl mb-3">
            ¿Porque Super Apuestas?
          </div>
          <div className="border-4 border-muted-foreground rounded-full size-40 flex items-center justify-center my-3">
            <span className="font-bold text-5xl italic text-muted-foreground">
              +20
            </span>
          </div>

          <div className="text-3xl italic font-medium text-muted-foreground/90">
            +20 AÑOS DE TRAYECTORIA
          </div>
          <div className="text-xl font-medium text-muted-foreground/60">
            Lideres en Latinoamérica
          </div>
          <div className="font-medium">
            Super Apuestas ha logrado consolidarse como una de las compañías más
            fiables y legítimas de la industria.
          </div>
        </section>

        <section className="min-h-dvh flex flex-col items-center justify-center">
          <Image
            src={"/img-u-phone-credit-card.png"}
            alt=""
            width={450}
            height={450}
          />

          <div>RETIROS Y DEPÓSITOS</div>
          <div>Deposita, cobra fácil y rápido</div>
          <div>
            Variedad de opciones en nuestro{" "}
            <span className="font-bold">Cajero en Línea</span>
          </div>
        </section>
      </div>
    </>
  );
}
