import { Button } from "@/components/ui/button";
import { BetContext } from "@/context/create-bet";
import { useContext } from "react";

export default function ReturnButton() {
  const { setStep, step } = useContext(BetContext);

  return (
    <>
      {step !== 1 ? (
        <Button className="ml-6 p-6" onClick={() => setStep(1)}>
          Volver a elección de evento
        </Button>
      ) : null}
    </>
  );
}
