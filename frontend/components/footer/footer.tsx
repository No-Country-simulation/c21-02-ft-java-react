import { Separator } from "../ui/separator";

export default function Footer() {
  return (
    <>
      <footer className="w-full pb-3">
        <div className="flex h-5 items-center space-x-4 text-sm justify-center">
          <div className="">FAQ</div>
          <Separator orientation="vertical" />
          <div>Precios</div>
          <Separator orientation="vertical" />
          <div>Términos</div>
          <Separator orientation="vertical" />
          <div>Privacidad</div>
        </div>
      </footer>
    </>
  );
}
