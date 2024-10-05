import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function NavbarNotAuthenticated() {
  return (
    <>
      <div className="flex justify-between p-3">
        <div>
          <Image src={"/logo.png"} alt="" width={40} height={40} />
        </div>
        <div className="flex gap-2 items-center">
          <Button variant={"outline"} size={"sm"}>
            Iniciar sesión
          </Button>
          <Button size={"sm"}>Registrarse</Button>
        </div>
      </div>
    </>
  );
}
