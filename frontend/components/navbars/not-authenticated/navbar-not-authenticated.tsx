"use client";
import { Button } from "@/components/ui/button";

import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import LoginSheetContent from "@/components/login-sheet-content/login-sheet-content";
import { useRouter } from "next/navigation";
import Logo from "@/components/logo/logo";

export default function NavbarNotAuthenticated() {
  const router = useRouter();
  return (
    <>
      <div className="flex justify-between p-3">
        <div>
          <Logo />
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
          <Button size={"sm"} onClick={() => router.push("registro")}>
            Registrarse
          </Button>
        </div>
      </div>
    </>
  );
}
