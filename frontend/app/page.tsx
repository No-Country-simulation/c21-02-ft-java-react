import Footer from "@/components/footer/footer";
import Homepage from "@/components/homepage/homepage";
import NavbarNotAuthenticated from "@/components/navbars/not-authenticated/navbar-not-authenticated";

export default function Home() {
  return (
    <>
      <div className="min-h-dvh overflow-hidden flex flex-col">
        <NavbarNotAuthenticated />
        {/* last bets */}
        <Homepage className="grow" />
        <Footer />
      </div>
    </>
  );
}
