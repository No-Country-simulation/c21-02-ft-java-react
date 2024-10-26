"use client";

import { useAppSelector, useAppDispatch } from '@/hooks/hooks';
import { getLobbyById } from '@/store/actions/lobbyActions';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useEffect } from 'react';
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
    const dispatch = useAppDispatch();
    const { id } = useParams<{ id: string }>();

    const user = useAppSelector(store => store.user)
    const lobby = useAppSelector(store => store.lobby.lobby)

    useEffect(() => {
        const token = user.token ?
            user.token : localStorage.getItem('token') ?
                localStorage.getItem('token') : null;
        token ?
            dispatch(getLobbyById({ token, id })) :
            alert("You are not authorized.")
    }, [dispatch, id, user.token])

    return (
        <div className="flex flex-col justify-center items-center mt-16">
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
                                                    <SelectItem value="TEAM1_WIN">{lobby.sportEvent?.team1}</SelectItem>
                                                    <SelectItem value="TEAM2_WIN">{lobby.sportEvent?.team1}</SelectItem>
                                                </SelectContent>
                                                : null
                                        }
                                    </Select>
                                </div>
                            </div>
                            <DialogFooter>
                                <Button type="submit">Confirmar</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                    <div className='flex flex-col justify-center items-center gap-4'>
                        <h1 className='text-3xl'>Lista de jugadores</h1>
                        {lobby.usersInRoom.length > 0 ? lobby.usersInRoom.map(user =>
                            <div
                                key={user.id}
                                className="flex flex-row justify-evenly items-center border border-black dark:border-white p-4 w-[90%]">
                                <Image
                                    className='rounded-full'
                                    src={user.profileImage}
                                    alt='Profile photo'
                                    width={40}
                                    height={40}
                                />
                                <p>{user.name}</p>
                            </div>
                        ) : <p>No hay jugadores en esta sala.</p>}
                    </div>
                </div>

                : null}
        </div>
    );
};

export default Page;
