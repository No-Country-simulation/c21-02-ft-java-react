"use client"

import { Button } from "@/components/ui/button";
import { useAppSelector, useAppDispatch } from "@/hooks/hooks";
import { getLobbies } from "@/store/actions/lobbyActions";

import CardLoader from "@/components/CardLoader/CardLoader"
import LobbiesCards from "@/components/LobbiesCards/LobbiesCards";
import { useEffect, useState } from "react";

const Page = () => {

    const dispatch = useAppDispatch();
    const user = useAppSelector(store => store.user);
    const token = user.token

    const loadingLobbies = useAppSelector(store => store.lobby.loading)
    const loadingUser = useAppSelector(store => store.user.loading)

    const [isLoaded, setIsLoaded] = useState<boolean>(false);

    useEffect(() => {
        const token = user.token ?
            user.token : localStorage.getItem('token') ?
                localStorage.getItem('token') : null;
        if (token) dispatch(getLobbies(token))
        else alert("No estás autorizado.")
    }, [dispatch, user.token])

    useEffect(() => {
        if (!loadingLobbies && !loadingUser) {
            setIsLoaded(true);
        }
    }, [loadingLobbies, loadingUser]);

    return (
        <div className="flex flex-col justify-center gap-8 my-16">
            <div className="flex flex-col justify-center items-center gap-8">
                <h1 className="text-5xl">Salas activas</h1>
                <Button onClick={() => dispatch(getLobbies(token ? token : ""))} className="">Actualizar</Button>
            </div>
            {
                isLoaded ? <LobbiesCards />
                    : <CardLoader section="salas" />
            }
        </div>
    )
}

export default Page
