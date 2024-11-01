"use client"

import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { getLobbies } from "@/store/actions/lobbyActions";
import { useEffect } from "react";

export default function Page() {

  const dispatch = useAppDispatch();

  const lobbies = useAppSelector(store => store.lobby.lobbies)
  const user = useAppSelector(store => store.user)

  useEffect(() => {
    const token = user.token ?
      user.token : localStorage.getItem('token') ?
        localStorage.getItem('token') : null;
    if (token) dispatch(getLobbies(token))
    else alert("No estás autorizado.")
  }, [dispatch, user.token])

  return (
    <>
      <div className="flex flex-row justify-center items-center max-h-screen min-h-screen overflow-auto pt-5">
        <div className="max-w-5xl">Cantidad total de salas: {lobbies.length}</div>
      </div>
    </>
  );
}
