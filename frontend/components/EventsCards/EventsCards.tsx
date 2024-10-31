"use client"

import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { formatDateString } from "@/lib/utils";
import { getEvents } from "@/store/actions/lobbyActions";
import { useEffect, useState } from "react";
import { Slide } from "react-awesome-reveal";

import CardLoader from "@/components/CardLoader/CardLoader"

const EventsCards = () => {

    const provisionalUserToken = process.env.NEXT_PUBLIC_PROVISIONAL_USER_TOKEN ?
        process.env.NEXT_PUBLIC_PROVISIONAL_USER_TOKEN : ""

    const dispatch = useAppDispatch();
    const events = useAppSelector(store => store.lobby.events)
    const user = useAppSelector(store => store.user)

    const loadingEvents = useAppSelector(store => store.lobby.loading)
    const loadingUser = useAppSelector(store => store.user.loading)

    const [isLoaded, setIsLoaded] = useState<boolean>(false);

    useEffect(() => {
        const token = user.token ?
            user.token : localStorage.getItem('token') ?
                localStorage.getItem('token') : null;
        if (provisionalUserToken) dispatch(getEvents(provisionalUserToken))
    }, [dispatch, user.token, provisionalUserToken])

    useEffect(() => {
        if (!loadingEvents && !loadingUser) {
            setIsLoaded(true);
        }
    }, [loadingEvents, loadingUser]);

    return (
        <>
            {
                isLoaded ?
                    <Slide direction="left" className="flex flex-col items-center my-8" triggerOnce>
                        <div className="flex flex-row justify-center max-md:flex-wrap gap-4 italic">
                            <span className="max-md:text-4xl text-6xl text-primary font-semibold">EVENTOS</span>
                            <span className="max-md:text-4xl text-6xl text-red-500 font-bold">DISPONIBLES</span>
                        </div>
                        <div className="flex flex-col max-md:flex-wrap self-center gap-12 md:w-[80%] max-md:w-[95%]">
                            {(events[0].id !== 0) ?
                                events.map(event => (
                                    <div className="flex flex-row max-md:flex-wrap 
                                    max-md:text-sm justify-between items-center 
                                    md:p-4 
                                    min-h-[15vh] 
                                    bg-gradient-to-r from-slate-950 to-blue-950 
                                    border border-neutral-700 rounded-md hover:-translate-y-5 duration-300 
                                    hover:shadow-lg hover:shadow-blue-800" key={event.id}>
                                        <div className="flex flex-col justify-center items-center w-[25%]">
                                            <p className="italic md:text-2xl font-semibold text-primary">Categoría:</p>
                                            <p className="md:text-xl text-green-400">Fútbol</p>
                                        </div>
                                        <div className="w-[50%] max-md:text-sm flex flex-row max-md:flex-wrap max-md:justify-center md:justify-between items-center">
                                            <span className="font-bold text-center md:text-3xl md:w-[45%]">{event.team1}</span>
                                            <span className="md:mx-6 max-md:text-center md:text-2xl max-md:w-[100%] text-neutral-400">vs.</span>
                                            <span className="font-bold md:text-3xl md:w-[45%] text-center">{event.team2}</span>
                                        </div>
                                        <div className="flex flex-col max-md:text-sm justify-center items-center w-[25%]">
                                            <p className="md:text-2xl italic font-semibold text-primary">Finaliza en:</p>
                                            <p>{formatDateString(event.eventDate)}</p>
                                        </div>
                                    </div>
                                )
                                ) : null}
                        </div>
                    </Slide>
                    : <CardLoader />}
        </>
    )
};

export default EventsCards;