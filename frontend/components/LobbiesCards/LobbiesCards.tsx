"use client"

import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { getLobbies } from "@/store/actions/lobbyActions";
import { useEffect, useRef, useState } from "react";
import { Slide } from "react-awesome-reveal";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import { Input } from "@/components/ui/input";

const LobbiesCards = () => {

    const input = useRef<HTMLInputElement>(null);

    const router = useRouter();

    const lobbies = useAppSelector(store => store.lobby.lobbies)
    const user = useAppSelector(store => store.user)

    const handleCheckPassword = (id: number) => {
        if (input.current!.value.length > 0) return router.push("/salas/" + id)
        alert("La contraseña no es correcta.")
    }

    return (
        <>
            {
                lobbies.map((lobby, index) =>
                    (lobby.id !== 0 && !lobby.privateRoom) ? (
                        <Slide key={`lobby-${lobby.id}`} direction="left" className="flex flex-col items-center" triggerOnce>
                            <div
                                className={`flex flex-row max-md:flex-wrap 
                                    max-md:text-sm justify-between items-center 
                                    md:p-4 
                                    min-h-[15vh] w-[95%]
                                    bg-gradient-to-r ${lobby.enable ? 'from-green-950' : 'from-red-950'} via-blue-950 via-20% to-slate-950
                                    border border-neutral-700 rounded-md duration-300 
                                    hover:shadow-lg hover:shadow-blue-800`}>
                                <div className="min-w-[20%]">
                                    <p className="text-neutral-500">
                                        ID: {lobby.id}
                                    </p>
                                    <p>
                                        {lobby.roomName}
                                    </p>
                                </div>
                                <p className={lobby.enable ? "text-green-500 min-w-[20%]" : "text-red-500 min-w-[20%]"}>
                                    Estado: {lobby.enable === true ? "Abierta" : "Finalizada"}
                                </p>
                                <p>
                                    Cantidad requerida:
                                    <span className={(user.balance >= lobby.bet) ? "" : "text-red-500"}> {lobby.bet} créditos
                                    </span>
                                </p>
                                <p className={lobby.usersInRoom?.length === lobby.maxUsers ? "text-red-500" : ""}>
                                    {lobby.usersInRoom?.length} / {lobby.maxUsers} Usuarios unidos
                                </p>
                                <Button disabled={lobby.enable === false || lobby.usersInRoom?.length === lobby.maxUsers} onClick={() => router.push("/salas/" + lobby.id)} className="">Entrar</Button>
                            </div>
                        </Slide>
                    ) : (lobby.id !== 0) ? (
                        <Slide key={`private-${lobby.id}`} direction="left" className="flex flex-col items-center" triggerOnce>
                            <div
                                className={`flex flex-row max-md:flex-wrap 
                                    max-md:text-sm justify-between items-center 
                                    md:p-4 
                                    min-h-[15vh] w-[95%]
                                    bg-gradient-to-r via-20% ${lobby.enable ? 'from-yellow-950' : 'from-red-950'} to-slate-950 via-blue-950 
                                    border border-neutral-700 rounded-md duration-300 
                                    hover:shadow-lg hover:shadow-blue-800`}>
                                <div className="min-w-[20%]">
                                    <p className="text-neutral-500">
                                        ID: {lobby.id}
                                    </p>
                                    <p>
                                        {lobby.roomName}
                                    </p>
                                </div>
                                <p className={lobby.enable && lobby.privateRoom ? "text-orange-300 min-w-[20%]" : lobby.enable ? "text-green-500 min-w-[20%]" : "text-red-500 min-w-[20%]"}>
                                    Estado: {lobby.enable === true ? "Abierta" : "Finalizada"} {lobby.privateRoom ? "(Contraseña requerida)" : null}

                                </p>
                                <p>
                                    Cantidad requerida:
                                    <span className={(user.balance >= lobby.bet) ? "" : "text-red-500"}> {lobby.bet} créditos
                                    </span>
                                </p>
                                <p className={lobby.usersInRoom?.length === lobby.maxUsers ? "text-red-500" : ""}>
                                    {lobby.usersInRoom?.length} / {lobby.maxUsers} Usuarios unidos
                                </p>
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button variant="default" disabled={lobby.enable === false || lobby.usersInRoom?.length === lobby.maxUsers}>Entrar</Button>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-[425px]">
                                        <DialogHeader>
                                            <DialogTitle>Entrar a sala privada</DialogTitle>
                                            <DialogDescription>
                                                Ingresa la contraseña para entrar.
                                            </DialogDescription>
                                        </DialogHeader>
                                        <div className="grid gap-4 py-4">
                                            <Input
                                                ref={input}
                                                className=""
                                                type="password"
                                            />
                                        </div>
                                        <DialogFooter>
                                            <Button onClick={() => handleCheckPassword(lobby.id)} type="button">Entrar</Button>
                                        </DialogFooter>
                                    </DialogContent>
                                </Dialog>
                            </div>
                        </Slide>
                    ) : null
                )
            }
        </>
    );
};

export default LobbiesCards;
