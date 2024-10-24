"use client";

import { useAppSelector, useAppDispatch } from '@/hooks/hooks';
import { getLobbyById } from '@/store/actions/lobbyActions';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useEffect } from 'react';

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
    }, [])

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
