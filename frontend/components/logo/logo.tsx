import { cn } from "@/lib/utils";
import Image from "next/image";

interface LogoProps extends React.HTMLAttributes<HTMLImageElement> {
  className?: string;
}

export default function Logo({ className, ...rest }: LogoProps) {
  return (
    <>
      <Image
        src={"/logo.png"}
        alt=""
        width={40}
        height={40}
        {...rest}
        className={cn(className)}
      />
    </>
  );
}
