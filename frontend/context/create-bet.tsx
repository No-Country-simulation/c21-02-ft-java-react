"use client";
import React, { createContext, useState } from "react";

export const BetContext = createContext<any>(null);

export default function BetContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [betSettings, setBetSettings] = useState<any>({});
  const [step, setStep] = useState(1);
  return (
    <>
      <BetContext.Provider
        value={{
          betSettings,
          setBetSettings,
          step,
          setStep,
        }}
      >
        {children}
      </BetContext.Provider>
    </>
  );
}
