import NavbarAuthenticated from "@/components/navbars/authenticated/navbar-authenticated";

export default function Page() {
  return (
    <>
      <div className="flex min-h-screen">
        <NavbarAuthenticated />
        <div className="grow"></div>
      </div>
    </>
  );
}
