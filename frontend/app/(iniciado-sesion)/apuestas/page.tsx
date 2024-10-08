import { TableBets } from "@/components/table-bets/table-bets";
import { Input } from "@/components/ui/input";

export default function Page() {
  return (
    <>
      <div className="max-h-screen min-h-screen overflow-auto pt-5">
        <div className="flex justify-between max-w-5xl mx-auto">
          <h2 className="text-4xl font-medium ms-2">Apuestas en curso</h2>
          <Input placeholder="🔎 Buscar por nombre" className="max-w-60 me-5" />
        </div>

        <TableBets />
      </div>
    </>
  );
}
