"use client";
import { BetContext } from "@/context/create-bet";
import Image from "next/image";
import { useContext } from "react";
import { Fade, Slide } from "react-awesome-reveal";

export default function CreateBetType() {
  const { setBetSettings, setStep, step } = useContext(BetContext);

  if (step !== 1) return null;

  return (
    <>
      <Fade triggerOnce>
        <section className="flex flex-col items-center justify-center py-20">
          <div className="text-center font-black text-4xl mb-3 text-primary">
            Comienza a jugar con Super Apuestas
          </div>
          <div className="text-center font-black text-4xl mb-3">
            Elije un evento
          </div>
          <div className="flex justify-center items-center max-w-7xl mx-auto">
            <Slide direction="left" triggerOnce>
              <div className="p-3">
                <Image
                  src={"/betcris-ligas_eu-img.png"}
                  alt=""
                  width={450}
                  height={450}
                  className="object-scale-down size-80 hover:-translate-y-2 animation duration-200 hover:cursor-pointer mx-auto"
                  onClick={() => {
                    setBetSettings((prev: any) => ({
                      ...prev,
                      type: "soccer",
                    }));
                    setStep(2);
                  }}
                />
                <p className="text-3xl">Disfruta lo mejor de las ligas</p>
                <p className="text-6xl font-bold">EUROPEAS</p>
                <p className="text-xl">
                  <span className="font-bold">¡Celebra cada gol </span>de tu
                  equipo favorito!
                </p>
              </div>
            </Slide>

            <Slide direction="right" triggerOnce>
              <div className="p-3">
                <Image
                  src={"/bectris-homebanner-img-des.png"}
                  alt=""
                  width={450}
                  height={450}
                  className="object-scale-down size-80 hover:-translate-y-2 animation duration-200 hover:cursor-pointer mx-auto"
                />

                <p className="text-3xl text-end">
                  Juegos de mesa espeluznantes
                </p>
                <p className="text-6xl font-bold text-end">BLACKJACK</p>
                <p className="text-xl text-end">
                  <span className="font-bold">¿Te atreves a jugar? </span>
                </p>
              </div>
            </Slide>
          </div>
        </section>
      </Fade>
    </>
  );
}
