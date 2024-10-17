"use client";
import { Button } from "@/components/ui/button";

import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import LoginSheetContent from "@/components/login-sheet-content/login-sheet-content";
import { useRouter } from "next/navigation";
import Logo from "@/components/logo/logo";
import { useState, useEffect, useRef } from "react";

export default function NavbarNotAuthenticated() {
  const router = useRouter();

  const [isHidden, setIsHidden] = useState(false);
  const lastScrollTopRef = useRef(0);

  const handleScroll = () => {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;

    if (scrollTop > lastScrollTopRef.current) {
      setIsHidden(true);
    } else {
      setIsHidden(false);
    }
    lastScrollTopRef.current = scrollTop;
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <div
        className={`bg-neutral-100/45
                    dark:bg-neutral-950/45
                    sticky top-0 
                    backdrop-blur-xl
                    max-md:flex-wrap
                    max-md:flex-col
                    md:w-full 
                    px-1 py-2 
                    flex flex-row 
                    md:justify-between 
                    max-md:gap-4
                    border-r 
                    hover:shadow-lg
                    transition duration-500 ease-in-out
                    z-10
                    ${isHidden ? '-translate-y-full' : ''}`}>
        <div>
          <div className="flex flex-row lg:gap-4 justify-between max-md:justify-around max-md:items-center">
            <Logo className="md:mx-auto" />
            <div
              className="text-3xl text-primary font-semibold italic md:max-lg:hidden"
            >
              Super Apuestas
            </div>
          </div>
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
