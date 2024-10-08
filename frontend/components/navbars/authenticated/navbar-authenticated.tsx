import Logo from "@/components/logo/logo";
import { Button } from "@/components/ui/button";
import {
  BarChartIcon,
  Component1Icon,
  GearIcon,
  PlusIcon,
} from "@radix-ui/react-icons";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function NavbarAuthenticated() {
  return (
    <>
      <div className="bg-muted/40 px-1 py-2 h-screen flex flex-col justify-between">
        <TooltipProvider delayDuration={300}>
          <div className="flex flex-col gap-3">
            <Logo />
            <div className="flex flex-col items-center justify-start gap-2">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button size={"icon"}>
                    <PlusIcon />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>Nueva apuesta</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button size={"icon"} variant={"outline"}>
                    <Component1Icon />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>Apuestas en curso</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button size={"icon"} variant={"outline"}>
                    <BarChartIcon />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>Mejores jugadores</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button size={"icon"} variant={"ghost"}>
                <GearIcon />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>Configuración</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </>
  );
}
