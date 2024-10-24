"use client"

import HeaderAuthenticated from "@/components/navbars/authenticated/header-authenticated";
import NavbarNotAuthenticated from "@/components/navbars/not-authenticated/navbar-not-authenticated";
import { userSessionPersistence } from "@/store/actions/userActions";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";

const SessionStateHeader = ({ children }: { children: React.ReactNode }) => {

    const dispatch = useAppDispatch()
    const user = useAppSelector(store => store.user)

    const session = {
        id: user.id,
        email: user.email,
        token: user.token,
        image: "/profile-icon.svg",
    };

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (token) dispatch(userSessionPersistence(token))

    }, [dispatch])


    return (
        <>
            {session.token ? <HeaderAuthenticated /> : <NavbarNotAuthenticated />}
            {children}
        </>
    )
}

export default SessionStateHeader