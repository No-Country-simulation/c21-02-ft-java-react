import Footer from "@/components/footer/footer";
import Homepage from "@/components/homepage/homepage";
import NavbarAuthenticated from "@/components/navbars/authenticated/navbar-authenticated";
import NavbarNotAuthenticated from "@/components/navbars/not-authenticated/navbar-not-authenticated";

export default function Home() {
  // Fake session - Pending backend
  const session = {
    id: "cdba0713854c4a3db6afb",
    name: "fake-username",
    token: "4943af0c-694b-4145-86eb",
    img: "/profile-icon.svg",
  };

  return (
    <>
      <div className="min-h-dvh overflow-hidden flex flex-col">
        {!session ? <NavbarAuthenticated /> : <NavbarNotAuthenticated />}

        {/* last bets */}
        <Homepage className="grow" />
        <Footer />
      </div>
    </>
  );
}
