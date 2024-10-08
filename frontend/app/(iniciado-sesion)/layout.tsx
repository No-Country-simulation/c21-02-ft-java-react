import NavbarAuthenticated from "@/components/navbars/authenticated/navbar-authenticated";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="flex min-h-screen">
        <NavbarAuthenticated />
        <div className="grow">{children}</div>
      </div>
    </>
  );
}
