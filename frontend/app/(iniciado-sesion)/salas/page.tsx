"use client"

import { Button } from "@/components/ui/button";
import { useAppSelector, useAppDispatch } from "@/hooks/hooks";
import { getLobbies } from "@/store/actions/lobbyActions";
import { useEffect, useRef, useState } from "react";

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

const Page = () => {

    const input = useRef<HTMLInputElement>(null);

    const router = useRouter();
    const dispatch = useAppDispatch();

    const user = useAppSelector(store => store.user);
    const lobbies = useAppSelector(store => store.lobby.lobbies);

    const token = user.token

    const handleCheckPassword = (id: number) => {
        if (input.current!.value.length > 0) return router.push("/salas/" + id)
        alert("La contraseña no es correcta.")
    }

    useEffect(() => {
        const token = user.token ?
            user.token : localStorage.getItem('token') ?
                localStorage.getItem('token') : null;
        token ?
            dispatch(getLobbies(token)) :
            alert("No estás autorizado.")
    }, [dispatch, user.token])

    return (
        <div className="flex flex-col justify-center items-center gap-8">
            <h1 className="text-5xl">Salas activas</h1>
            <Button onClick={() => dispatch(getLobbies(token ? token : ""))} className="">Actualizar</Button>
            {lobbies.map((lobby, index) =>
                (lobby.id !== 0 && !lobby.privateRoom) ?
                    <div
                        key={`lobby-${lobby.id}`}
                        className="flex flex-row flex-wrap justify-between items-center gap-4 border border-black dark:border-white p-4 w-[90%]">
                        <div className="min-w-[10%]">
                            <p className="text-neutral-500">
                                ID: {lobby.id}
                            </p>
                            <p>
                                {lobby.roomName}
                            </p>
                        </div>
                        <p className={lobby.enable ? "text-green-500 min-w-[20%]" : "text-red-500 min-w-[20%]"}>
                            Estado: {lobby.enable === true ? "Abierta" : "Cerrada"}
                        </p>
                        <p>
                            Cantidad requerida:
                            <span className={(user.balance >= lobby.bet) ? "" : "text-red-500"}> {lobby.bet} créditos
                            </span></p>
                        <p className={lobby.usersInRoom?.length === lobby.maxUsers ? "text-red-500" : ""}>
                            {lobby.usersInRoom?.length} / {lobby.maxUsers} Usuarios unidos
                        </p>
                        <Button disabled={lobby.enable === false} onClick={() => router.push("/salas/" + lobby.id)} className="">Entrar</Button>
                    </div> :
                    (lobby.id !== 0) ?
                        <div
                            key={`private-${lobby.id}`}
                            className="flex flex-row flex-wrap justify-between items-center gap-4 border border-black dark:border-white p-4 w-[90%]">
                            <div className="min-w-[10%]">
                                <p className="text-neutral-500">
                                    ID: {lobby.id}
                                </p>
                                <p>
                                    {lobby.roomName}
                                </p>
                            </div>
                            <p className={lobby.enable && lobby.privateRoom ? "text-orange-300 min-w-[20%]" : lobby.enable ? "text-green-500 min-w-[20%]" : "text-red-500 min-w-[20%]"}>
                                Estado: {lobby.enable === true ? "Abierta" : "Cerrada"} {lobby.privateRoom ? "(Se requiere contraseña)" : null}
                            </p>
                            <p>
                                Cantidad requerida:
                                <span className={(user.balance >= lobby.bet) ? "" : "text-red-500"}> {lobby.bet} créditos
                                </span></p>
                            <p className={lobby.usersInRoom?.length === lobby.maxUsers ? "text-red-500" : ""}>
                                {lobby.usersInRoom?.length} / {lobby.maxUsers} Usuarios unidos
                            </p>
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button variant="default" disabled={lobby.enable === false}>Entrar</Button>
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
                        </div> : <div key={`loading-${index}`}>
                            <p>Recuperando salas...</p>
                        </div>
            )}
        </div>
    )
}

export default Page
