"use client";
import BetContextProvider from "@/context/create-bet";
import BetBet from "@/components/create-bet/bet-bet";
import BetConfiguration from "@/components/create-bet/bet-configuration";
import CreateBetType from "@/components/create-bet/create-bet-type";
import ReturnButton from "@/components/create-bet/return-button";

export default function Page() {
  return (
    <>
      <div className="mx-auto max-h-screen min-h-screen overflow-auto pt-5">
        <BetContextProvider>
          <ReturnButton />
          {/* step 1 */}
          <CreateBetType />
          {/* step 2 */}
          <BetConfiguration />
          {/* step 3 */}
          <BetBet />
        </BetContextProvider>
      </div>
    </>
  );
}
