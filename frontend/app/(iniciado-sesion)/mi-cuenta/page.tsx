"use client"
import { Button } from "@/components/ui/button";
import { DatePickerDemo } from "@/components/ui/date-picker";
import { Input } from "@/components/ui/input";
import { useAppSelector } from "@/hooks/hooks";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Page() {

  const user = useAppSelector(store => store.user)

  const email = user.email
  const router = useRouter();

  return (
    <div className="flex justify-around">
      <div className="flex flex-col gap-16 mt-16">
        <p className="text-5xl max-w-5xl font-semibold text-center">Mi perfil</p>
        <div className="flex flex-row gap-8 items-center">
          <div
            className="flex relative items-center justify-center w-56 aspect-square bg-transparent rounded-full outline outline-1 outline-neutral-300 dark:outline-neutral-900 p-2">
            <Image
              src={user.image}
              alt="User photo"
              width={100}
              height={100} />
            <Button
              className="absolute 
            right-0 
            bottom-0 
            rounded-full
            text-white 
            bg-neutral-300
            dark:bg-neutral-300 
            p-0 
            aspect-square">
              <Image
                src={"/camera-icon.svg"}
                alt=""
                width={20}
                height={20}
              />
            </Button>
          </div>
          <Input disabled placeholder="E-mail" type="email" value={email} />
        </div>
        <div className="flex flex-row gap-16 items-center">
          <Input disabled placeholder="Nombre" type="text" value={user.name} />
        </div>
        <div className="flex flex-row gap-4 items-center">
          <p className="text-sm text-slate-400">Fecha de nacimiento</p>
          <Input disabled className="placeholder-slate-400" placeholder="Fecha de nacimiento" type="date" />
          <Input disabled placeholder="Sexo" type="text" />
        </div>
        <div className="flex flex-col gap-8">
          <Input placeholder="Dirección de facturación 1" type="text" />
          <Input placeholder="Dirección de facturación 2" type="text" />
          <Input placeholder="Dirección de facturación 3" type="text" />
        </div>
        <div className="flex flex-row justify-between gap-64">
          <Button className="text-white" onClick={() => alert("Cambios realizados con éxito!")}>Guardar cambios</Button>
          <Button className="bg-neutral-500 text-white" onClick={() => router.push("/")}>Volver</Button>
        </div>
      </div>
    </div>
  );
}
