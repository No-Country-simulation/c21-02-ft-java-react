import Image from "next/image";

export default function FooterSpecial() {
  return (
    <>
      <div className="mx-auto text-center mt-20">
        © 2024 Super Apuestas™ Pronósticos Deportivos & Caballos Derechos
        Reservados.
        <div className="flex items-center justify-center gap-5">
          <Image
            src={"/svgviewer-output.svg"}
            alt=""
            width={140}
            height={140}
          />
          <Image
            src={"/svgviewer-output-2.svg"}
            alt=""
            width={140}
            height={140}
          />
          <Image
            src={"/svgviewer-output-3.svg"}
            alt=""
            width={140}
            height={140}
          />
          <Image
            src={"/svgviewer-output-4.svg"}
            alt=""
            width={140}
            height={140}
          />
          <Image
            src={"/svgviewer-output-5.svg"}
            alt=""
            width={140}
            height={140}
          />
        </div>
      </div>
    </>
  );
}
