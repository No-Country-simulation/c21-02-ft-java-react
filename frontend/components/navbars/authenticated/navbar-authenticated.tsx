"use client";
import Logo from "@/components/logo/logo";
import { Button } from "@/components/ui/button";
import {
  BarChartIcon,
  CaretSortIcon,
  Component1Icon,
  PinLeftIcon,
  PinRightIcon,
  PlusIcon,
} from "@radix-ui/react-icons";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";

export default function NavbarAuthenticated() {
  const [isExpandedMenu, setIsExpandedMenu] = useState(false);
  const router = useRouter();
  return (
    <>
      <div
        className={`bg-muted/40 relative px-1 py-2 h-screen flex flex-col justify-between transition duration-500 border-r hover:shadow ${isExpandedMenu ? 'w-50' : ""
          }`}
      >
        <TooltipProvider delayDuration={300}>

          <div className="flex flex-col gap-3">
            <Logo onClick={() => router.push("/")} className="mx-auto cursor-pointer" />
            {isExpandedMenu ? (
              <>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      size={"icon"}
                      variant={"outline"}
                      onClick={() => {
                        setIsExpandedMenu((prev) => !prev);
                      }}
                      className="absolute top-2 right-2 my-4
                      "
                    >
                      <PinLeftIcon />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    <p>Comprimir</p>
                  </TooltipContent>
                </Tooltip>
              </>
            ) : (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    size={"icon"}
                    variant={"outline"}
                    onClick={() => {
                      setIsExpandedMenu((prev) => !prev);
                    }}
                    className="my-4"
                  >
                    <PinRightIcon />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>Expandir</p>
                </TooltipContent>
              </Tooltip>
            )}
            <div
              className={`text-center text-xs ${isExpandedMenu ? "block" : "hidden"
                }`}
            >
              Super Apuestas
            </div>
            <div className="flex flex-col items-center justify-start gap-2">
              {isExpandedMenu ? (
                <>
                  <Button
                    className="flex gap-2 w-full"
                    onClick={() => router.push("nueva-apuesta")}
                  >
                    <PlusIcon />
                    Nueva apuesta
                  </Button>

                  <Button
                    className="flex gap-2 w-full justify-start"
                    variant={"ghost"}
                    onClick={() => router.push("apuestas")}
                  >
                    <Component1Icon />
                    Apuestas online
                  </Button>

                  <Button
                    className="flex gap-2 w-full justify-start"
                    variant={"ghost"}
                    onClick={() => router.push("estadisticas")}
                  >
                    <BarChartIcon />
                    Estadísticas
                  </Button>
                </>
              ) : (
                <>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        size={"icon"}
                        onClick={() => router.push("nueva-apuesta")}
                      >
                        <PlusIcon />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="right">
                      <p>Nueva apuesta</p>
                    </TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        size={"icon"}
                        variant={"outline"}
                        onClick={() => router.push("apuestas")}
                      >
                        <Component1Icon />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="right">
                      <p>Apuestas online</p>
                    </TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        size={"icon"}
                        variant={"outline"}
                        onClick={() => router.push("estadisticas")}
                      >
                        <BarChartIcon />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="right">
                      <p>Estadísticas</p>
                    </TooltipContent>
                  </Tooltip>
                </>
              )}
            </div>
          </div>

          <div className="flex flex-col justify-center items-center gap-2">
            {!isExpandedMenu ? (
              <>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Avatar className="hover:cursor-pointer">
                      <AvatarImage src="https://avatars.githubusercontent.com/u/119996547?s=96&v=4" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem
                      onClick={() => router.push("mi-cuenta")}>
                      Mi cuenta
                    </DropdownMenuItem>
                    <DropdownMenuItem>Métodos de pago</DropdownMenuItem>
                    <DropdownMenuItem>Preferencias</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant={"ghost"} className="p-1">
                      <div className="flex gap-2 items-center justify-between">
                        <Avatar className="hover:cursor-pointer">
                          <AvatarImage src="https://avatars.githubusercontent.com/u/119996547?s=96&v=4" />
                          <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <div className="text-xs grow text-start">
                          <p className="font-bold">Rednaxela</p>
                          <p className="text-muted-foreground">
                            mi-cuenta@email.com
                          </p>
                        </div>
                        <CaretSortIcon />
                      </div>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem
                      onClick={() => router.push("mi-cuenta")}>
                      Mi cuenta</DropdownMenuItem>
                    <DropdownMenuItem>Métodos de pago</DropdownMenuItem>
                    <DropdownMenuItem>Preferencias</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            )}
          </div>
        </TooltipProvider>
      </div>
    </>
  );
}
