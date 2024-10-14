"use client"

import Footer from "@/components/footer/footer";
import Homepage from "@/components/homepage/homepage";
import HeaderAuthenticated from "@/components/navbars/authenticated/header-authenticated";
import NavbarNotAuthenticated from "@/components/navbars/not-authenticated/navbar-not-authenticated";
import { useAppSelector } from "@/hooks/hooks";

export default function Home() {

  const user = useAppSelector(store => store.user)

  // Fake session - Pending backend
  const session = {
    id: user.id,
    name: user.name,
    token: user.token,
    image: "/profile-icon.svg",
  };

  return (
    <>
      {session.id ? <HeaderAuthenticated /> : <NavbarNotAuthenticated />}
      <div className="flex flex-col">
        {/* last bets */}
        <Homepage className="grow" />
        <Footer />
      </div>
    </>
  );
}
