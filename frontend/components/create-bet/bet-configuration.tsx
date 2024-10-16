"use client";
import { BetContext } from "@/context/create-bet";
import Image from "next/image";
import { useContext } from "react";
import { Fade, Slide } from "react-awesome-reveal";

export default function BetConfiguration() {
  const { setBetSettings, setStep, step, betSettings } = useContext(BetContext);
  console.log(step, betSettings);

  if (step !== 2) return null;
  return (
    <>
      <Fade triggerOnce>
        <section className="flex flex-col items-center justify-center py-20">
          <div className="text-center font-black text-4xl mb-3 text-primary">
            Comienza a jugar con Super Apuestas
          </div>
          <div className="text-center font-black text-4xl mb-8">
            Elije el tipo de sala
          </div>
          <div className="flex justify-evenly items-center max-w-7xl mx-auto w-full">
            <Slide direction="up" triggerOnce delay={0}>
              <div className="p-3">
                <Image
                  src={"/lock-open.png"}
                  alt=""
                  width={450}
                  height={450}
                  className="object-scale-down size-40 hover:-translate-y-2 animation duration-200 hover:cursor-pointer mx-auto my-10"
                  onClick={() => {
                    setBetSettings((prev: any) => ({
                      ...prev,
                      room: "public",
                    }));
                    setStep(3);
                  }}
                />

                <p className="text-6xl font-bold">PUBLICA</p>
                <p className="text-xl">
                  <span className="font-bold">¡Mayores </span>recaudaciones!
                </p>
              </div>
            </Slide>

            <Slide direction="up" triggerOnce delay={250}>
              <div className="p-3">
                <Image
                  src={"/lock-closed.png"}
                  alt=""
                  width={450}
                  height={450}
                  className="object-scale-down size-40 hover:-translate-y-2 animation duration-200 hover:cursor-pointer mx-auto my-10"
                  onClick={() => {
                    setBetSettings((prev: any) => ({
                      ...prev,
                      room: "private",
                    }));
                    setStep(3);
                  }}
                />

                <p className="text-6xl font-bold text-end">PRIVADA</p>
                <p className="text-xl text-end">
                  <span className="font-bold">Modo entre amigos </span>
                </p>
              </div>
            </Slide>
          </div>
        </section>
      </Fade>
    </>
  );
}
