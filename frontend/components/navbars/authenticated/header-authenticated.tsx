"use client";
import Logo from "@/components/logo/logo";
import { Button } from "@/components/ui/button";
import {
    BarChartIcon,
    CaretSortIcon,
    Component1Icon,
    PlusIcon,
} from "@radix-ui/react-icons";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { useAppSelector } from "@/hooks/hooks";

import Link from 'next/link'

export default function HeaderAuthenticated() {

    const user = useAppSelector(store => store.user)

    const username: string = user.name
    const email: string = user.email
    const image: string = user.image

    const router = useRouter();

    const [pageLocation, setPageLocation] = useState(typeof window ? window.location.pathname : "")
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
                    md:justify-between items-center
                    max-md:gap-4
                    border-r 
                    hover:shadow-lg
                    transition duration-500 
                    z-10
                    ${isHidden ? '-translate-y-full' : ''}`}
            >
                <TooltipProvider delayDuration={300}>
                    <Link href={'/'}>
                        <div className="flex flex-row lg:gap-4 justify-between max-md:justify-around items-center">
                            <Logo className="md:mx-auto" />
                            <div
                                className="text-3xl text-primary font-semibold italic md:max-lg:hidden"
                            >
                                Super Apuestas
                            </div>
                        </div>
                    </Link>
                    <div className="flex flex-row max-md:flex-wrap items-center justify-start md:gap-2 max-md:gap-4">
                        <>
                            <Button
                                className="flex gap-2 w-full"
                                variant={(pageLocation === "/nueva-apuesta") ? "default" : "ghost"}
                                onClick={() => {
                                    router.push("/nueva-apuesta")
                                    setPageLocation("/nueva-apuesta")
                                }}
                            >
                                <PlusIcon />
                                Nueva apuesta
                            </Button>

                            <Button
                                className="flex gap-2 w-full md:justify-start"
                                variant={(pageLocation === "/salas") ? "default" : "ghost"}
                                onClick={() => {
                                    router.push("/salas")
                                    setPageLocation("/salas")
                                }}
                            >
                                <Component1Icon />
                                Apuestas online
                            </Button>

                            <Button
                                className="flex gap-2 w-full md:justify-start"
                                variant={(pageLocation === "/estadisticas") ? "default" : "ghost"}
                                onClick={() => {
                                    router.push("/estadisticas")
                                    setPageLocation("/estadisticas")
                                }}
                            >
                                <BarChartIcon />
                                Estadísticas
                            </Button>
                        </>
                    </div>

                    <p>Balance: {user.balance}</p>
                    <div className="flex flex-col justify-center items-center gap-2 max-md:w-full">
                        <>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant={"ghost"} className="p-1">
                                        <div className="flex gap-2 items-center justify-between">
                                            <Avatar className="hover:cursor-pointer">
                                                <AvatarImage src={image} />
                                                <AvatarFallback>PFP</AvatarFallback>
                                            </Avatar>
                                            <div className="text-xs grow text-start">
                                                <p className="font-bold">{username}</p>
                                                <p className="text-muted-foreground">
                                                    {email}
                                                </p>
                                            </div>
                                            <CaretSortIcon />
                                        </div>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuItem
                                        onClick={() => router.push("/mi-cuenta")}>
                                        Mi cuenta
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>Métodos de pago</DropdownMenuItem>
                                    <DropdownMenuItem>Preferencias</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </>
                    </div>
                </TooltipProvider>
            </div>
        </>
    );
}
