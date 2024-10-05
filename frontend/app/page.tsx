import Footer from "@/components/footer/footer";
import NavbarNotAuthenticated from "@/components/navbars/not-authenticated/navbar-not-authenticated";

export default function Home() {
  return (
    <>
      <div className="min-h-dvh overflow-hidden flex flex-col">
        <NavbarNotAuthenticated />
        {/* last bets */}
        <div className="grow"></div>
        <Footer />
      </div>
    </>
  );
}
