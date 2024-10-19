import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchData } from "@/lib/utils";

import axios from "axios";

const loginURL = process.env.NEXT_PUBLIC_USER_LOGIN
  ? process.env.NEXT_PUBLIC_USER_LOGIN
  : "";
const registerURL = process.env.NEXT_PUBLIC_USER_ENDPOINT
  ? process.env.NEXT_PUBLIC_USER_ENDPOINT
  : "";

export const userLogin = createAsyncThunk(
  "user/login",
  async ({ email, password }: { email: string; password: string }) => {
    try {
      {
        const data = fetchData(
          loginURL,
          "An error has occurred when trying to log in.",
          "POST",
          { email, password }
        );
        return console.log(data);
      }
    } catch (error) {
      return console.error(error); // Esto se pasará como payload a rejected
    }
  }
);

export const userRegister = createAsyncThunk(
  "user/register",
  async ({
    name,
    password,
    balance,
    email,
    userEnum,
  }: {
    name: string;
    password: string;
    balance: number;
    email: string;
    userEnum: "ADMIN" | "USER" | "INVITED";
  }) => {
    try {
      const data = fetchData(
        registerURL,
        "An error has occurred when trying to log in.",
        "POST",
        { name, password, balance, email, userEnum }
      );
      return console.log(data);
    } catch (error) {
      return console.error(error); // Esto se pasará como payload a rejected
    }
  }
);
