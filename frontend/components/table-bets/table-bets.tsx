"use client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { bets } from "./fake-data";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";

export function TableBets() {
  const [timeLeft, setTimeLeft] = useState(120);
  useEffect(() => {
    if (timeLeft === 0) return;

    const intervalId = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };
  return (
    <Table className="max-w-[1000px] mx-auto mt-10">
      <TableCaption>
        Todas las apuestas se muestran en tiempo real.
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Estatus</TableHead>
          <TableHead>Liga</TableHead>
          <TableHead>Equipo</TableHead>
          <TableHead>Equipo</TableHead>
          <TableHead className="text-center">Marcador</TableHead>
          <TableHead className="text-end">Bolsa</TableHead>
          <TableHead className="text-end">Premio</TableHead>
          <TableHead className="text-end">Cierra en</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {bets.map((bet) => (
          <TableRow key={bet.id}>
            <TableCell className="font-medium">
              <div className="size-2 bg-green-400 rounded-full mx-auto"></div>
            </TableCell>
            <TableCell>{bet.league}</TableCell>
            <TableCell>{bet.team1.name}</TableCell>
            <TableCell>{bet.team2.name}</TableCell>
            <TableCell className="text-center">
              {bet.team1.goals} | {bet.team2.goals}
            </TableCell>
            <TableCell className="text-end">
              ${bet.team1.bid + bet.team2.bid}
            </TableCell>
            <TableCell className="text-end">{"1:2"}</TableCell>
            <TableCell className="text-end">{formatTime(timeLeft)}</TableCell>
            <TableHead>
              <Button size={"sm"} variant={"link"}>
                Unirse
              </Button>
            </TableHead>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
