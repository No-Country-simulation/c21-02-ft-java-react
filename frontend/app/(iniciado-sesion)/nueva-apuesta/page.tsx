"use client";
import BetContextProvider from "@/app/context/create-bet";
import BetBet from "@/components/create-bet/bet-bet";
import BetConfiguration from "@/components/create-bet/bet-configuration";
import CreateBetType from "@/components/create-bet/create-bet-type";

export default function Page() {
  return (
    <>
      <div className="mx-auto max-h-screen min-h-screen overflow-auto pt-5">
        <BetContextProvider>
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
