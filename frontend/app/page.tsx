"use client"

import Footer from "@/components/footer/footer";
import Homepage from "@/components/homepage/homepage";
import HeaderAuthenticated from "@/components/navbars/authenticated/header-authenticated";
import NavbarNotAuthenticated from "@/components/navbars/not-authenticated/navbar-not-authenticated";
import { useAppSelector, useAppDispatch } from "@/hooks/hooks";
import { userSessionPersistence } from "@/store/actions/userActions";
import { useEffect } from "react";

export default function Home() {

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

    console.log(process.env.NEXT_PUBLIC_USER_LOGIN);
    console.log(process.env.NEXT_PUBLIC_USER_ENDPOINT);
    console.log(process.env.NEXT_PUBLIC_USER_GET_INFO_WITH_TOKEN);
    console.log(process.env.PORT);

  }, [dispatch])

  return (
    <>
      {session.token ? <HeaderAuthenticated /> : <NavbarNotAuthenticated />}
      <div className="flex flex-col">
        {/* last bets */}
        <Homepage className="grow" />
        <Footer />
      </div>
    </>
  );
}
