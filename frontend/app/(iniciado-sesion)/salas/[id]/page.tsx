"use client";

import { useAppSelector, useAppDispatch } from '@/hooks/hooks';
import { getLobbyById, setBet } from '@/store/actions/lobbyActions';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const Page = () => {

    const router = useRouter();

    const [token, setToken] = useState<string>();
    const [team, setTeam] = useState<"TEAM1_WIN" | "TEAM2_WIN">("TEAM1_WIN");

    const dispatch = useAppDispatch();
    const { id } = useParams<{ id: string }>();

    const user = useAppSelector(store => store.user)
    const lobby = useAppSelector(store => store.lobby.lobby)

    const userHasBetted = lobby.usersInRoom.find(userChecked => userChecked.id === user.id)
    const teamBetted = lobby.usersInRoom.find(userChecked => userChecked.id === user.id)?.betTeam

    useEffect(() => {
        const token = user.token ?
            user.token : localStorage.getItem('token') ?
                localStorage.getItem('token') : null;
        if (token) {
            dispatch(getLobbyById({ token, id }))
            setToken(token)
        } else {
            alert("You are not authorized.")
        }
    }, [dispatch, id, user.token])

    function handleSelectSubmit() {
        const betEnum = team
        const roomId = lobby.id

        dispatch(setBet({
            betEnum,
            roomId,
            token: token ? token : ""
        }))
    }

    return (
        <div className="flex flex-col justify-center items-center mt-16">
            <div className='self-start '>
                <Button onClick={() => router.push('/salas')} className='ml-6 p-6'>Volver a las salas</Button>
                <Button onClick={() => dispatch(getLobbyById(token ? { token, id } : { token: "", id }))} className='bg-green-500 hover:bg-green-600 self-start ml-6 p-6'>Actualizar</Button>
            </div>
            {lobby.id ?
                <div
                    className="flex flex-col justify-evenly items-center gap-16
                    w-[90%]">
                    <div
                        className="flex flex-col justify-evenly items-center gap-4
                        w-[90%]">
                        <h1 className='text-5xl'>{lobby.roomName}</h1>
                        <h2 className='text-neutral-500'>ID: {lobby.id}</h2>
                    </div>
                    <div>
                        <p className='text-4xl'>Bote total: {lobby.bet * lobby.usersInRoom.length} créditos</p>
                    </div>
                    {
                        !userHasBetted ?
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button variant="default">Colocar apuesta</Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[425px]">
                                    <DialogHeader>
                                        <DialogTitle>Apostar al ganador</DialogTitle>
                                        <DialogDescription>
                                            Ganarás si el equipo que eliges ahora también gana.
                                        </DialogDescription>
                                    </DialogHeader>
                                    <div className="grid gap-4 py-4">
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Select>
                                                <SelectTrigger className='w-max'>
                                                    <SelectValue placeholder="Selecciona un evento primero." />
                                                </SelectTrigger>
                                                {
                                                    lobby ?
                                                        <SelectContent className='w-full'>
                                                            <SelectItem key={"TEAM1_WIN"} onClick={() => setTeam("TEAM1_WIN")} value="TEAM1_WIN">{lobby.sportEvent?.team1}</SelectItem>
                                                            <SelectItem key={"TEAM2_WIN"} onClick={() => setTeam("TEAM2_WIN")} value="TEAM2_WIN">{lobby.sportEvent?.team2}</SelectItem>
                                                        </SelectContent>
                                                        : null
                                                }
                                            </Select>
                                        </div>
                                    </div>
                                    <DialogFooter>
                                        <Button onClick={() => handleSelectSubmit()} type="button">Confirmar</Button>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                            : <div>Ya has apostado a {teamBetted}.</div>
                    }

                    <div className='flex flex-col justify-center items-center gap-4'>
                        <h1 className='text-3xl'>Lista de jugadores</h1>
                        {lobby.usersInRoom.length > 0 ? lobby.usersInRoom.map((userMapped, index) =>
                            <div key={userMapped.id} className='flex flex-col gap-4 border border-black dark:border-white p-4 w-[90%]'>
                                <div
                                    className="flex flex-row justify-evenly items-center">
                                    <img
                                        className='rounded-full'
                                        src={userMapped.profileImage}
                                        alt='Profile photo'
                                        width={40}
                                        height={40}
                                    />
                                    <p className={user.name === userMapped.name ? "text-green-500" : ""}>{userMapped.name}{user.name === userMapped.name ? " (Tú)" : null}</p>
                                </div>
                                <p className='text-center'>Apostó por: {lobby.usersInRoom[index].betTeam}</p>
                            </div>
                        ) : <p>No hay jugadores en esta sala.</p>}
                    </div>
                </div>

                : null}
        </div>
    );
};

export default Page;
