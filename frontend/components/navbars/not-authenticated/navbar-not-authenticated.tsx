import { Button } from "@/components/ui/button";
import Image from "next/image";

import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import LoginSheetContent from "@/components/login-sheet-content/login-sheet-content";

export default function NavbarNotAuthenticated() {
  return (
    <>
      <div className="flex justify-between p-3">
        <div>
          <Image src={"/logo.png"} alt="" width={40} height={40} />
        </div>
        <div className="flex gap-2 items-center">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant={"outline"} size={"sm"}>
                Iniciar sesión
              </Button>
            </SheetTrigger>
            <LoginSheetContent />
          </Sheet>
          <Button size={"sm"}>Registrarse</Button>
        </div>
      </div>
    </>
  );
}
