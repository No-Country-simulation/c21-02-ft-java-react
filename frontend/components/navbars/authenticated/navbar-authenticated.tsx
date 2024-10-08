"use client";
import Logo from "@/components/logo/logo";
import { Button } from "@/components/ui/button";
import {
  BarChartIcon,
  CaretSortIcon,
  Component1Icon,
  GearIcon,
  LayoutIcon,
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
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function NavbarAuthenticated() {
  const [isExpandedMenu, setIsExpandedMenu] = useState(false);
  return (
    <>
      <div
        className={`bg-muted/40 relative px-1 py-2 h-screen flex flex-col justify-between transition duration-500 border-r hover:shadow ${
          isExpandedMenu ? "w-60" : ""
        }`}
      >
        <TooltipProvider delayDuration={300}>
          {isExpandedMenu && (
            <>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    size={"icon"}
                    variant={"outline"}
                    onClick={() => {
                      setIsExpandedMenu((prev) => !prev);
                    }}
                    className="absolute top-2 right-2
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
          )}

          <div className="flex flex-col gap-3">
            <Logo className="mx-auto" />
            <div
              className={`text-center text-xs ${
                isExpandedMenu ? "block" : "hidden"
              }`}
            >
              Super Apuestas
            </div>
            <div className="flex flex-col items-center justify-start gap-2">
              {isExpandedMenu ? (
                <>
                  <Button className="flex gap-2 w-full">
                    <PlusIcon />
                    Nueva apuesta
                  </Button>

                  <Button className="flex gap-2 w-full" variant={"ghost"}>
                    <Component1Icon />
                    Apuestas online
                  </Button>

                  <Button className="flex gap-2 w-full" variant={"ghost"}>
                    <BarChartIcon />
                    Estadísticas
                  </Button>
                </>
              ) : (
                <>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button size={"icon"}>
                        <PlusIcon />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="right">
                      <p>Nueva apuesta</p>
                    </TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button size={"icon"} variant={"outline"}>
                        <Component1Icon />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="right">
                      <p>Apuestas online</p>
                    </TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button size={"icon"} variant={"outline"}>
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

          <div className="flex flex-col gap-2">
            {!isExpandedMenu ? (
              <>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      size={"icon"}
                      variant={"outline"}
                      onClick={() => {
                        setIsExpandedMenu((prev) => !prev);
                      }}
                    >
                      <PinRightIcon />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    <p>Expandir</p>
                  </TooltipContent>
                </Tooltip>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Avatar className="hover:cursor-pointer">
                      <AvatarImage src="https://avatars.githubusercontent.com/u/119996547?s=96&v=4" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>Mi cuenta</DropdownMenuItem>
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
                    <DropdownMenuItem>Mi cuenta</DropdownMenuItem>
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
