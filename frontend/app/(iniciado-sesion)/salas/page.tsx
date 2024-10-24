"use client"

import { Button } from "@/components/ui/button";
import { useAppSelector, useAppDispatch } from "@/hooks/hooks";
import { getLobbies } from "@/store/actions/lobbyActions";
import { useEffect } from "react";

import { useRouter } from "next/navigation";

const Page = () => {

    const router = useRouter();
    const dispatch = useAppDispatch();

    const user = useAppSelector(store => store.user);
    const lobbies = useAppSelector(store => store.lobby.lobbies);

    const token = user.token

    useEffect(() => {
        const token = user.token ?
            user.token : localStorage.getItem('token') ?
                localStorage.getItem('token') : null;
        token ?
            dispatch(getLobbies(token)) :
            alert("You are not authorized.")
    }, [dispatch, user.token])

    return (
        <div className="flex flex-col justify-center items-center gap-8 mt-16">
            <h1 className="text-5xl">Salas activas</h1>
            <Button onClick={() => dispatch(getLobbies(token ? token : ""))} className="">Actualizar</Button>
            {lobbies.map(lobby =>
                (lobby.id !== null) ?
                    <div
                        key={lobby.id}
                        className="flex flex-row flex-wrap justify-evenly items-center gap-4 border border-black dark:border-white p-4 w-[90%]">
                        <div>

                            <p className="text-neutral-500">
                                ID: {lobby.id}
                            </p>
                            <p>
                                {lobby.roomName}
                            </p>
                        </div>
                        <p className={lobby.enable === true ? "text-green-500" : "text-red-500"}>
                            Estado: {lobby.enable === true ? "Abierta" : "Cerrada"}
                        </p>
                        <p>
                            Cantidad requerida:
                            <span className={(user.balance >= lobby.bet) ? "" : "text-red-500"}> {lobby.bet} créditos
                            </span></p>
                        <p className={lobby.usersInRoom.length === lobby.maxUsers ? "text-red-500" : ""}>
                            {lobby.usersInRoom.length} / {lobby.maxUsers} Usuarios unidos
                        </p>
                        <Button onClick={() => router.push("/salas/" + lobby.id)} className="">Entrar</Button>
                    </div> : null
            )}
        </div>
    )
}

export default Page