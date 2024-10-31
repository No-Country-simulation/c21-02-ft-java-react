import { HttpMethod } from "@/types/httpMethods";
import { UserLogin, UserRegister, UserProfile } from "@/types/user";
import { LobbyCreation, SetBet } from "@/types/lobby";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const fetchData = async <T>(
  url: string,
  errorMessage: string = 'An error has occurred',
  method: HttpMethod = 'GET',
  body: UserLogin | UserRegister | UserProfile | LobbyCreation | SetBet | null = null,
  token: string | null = null
): Promise<T> => {
  try {
    const options: RequestInit = {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` })
      },
    };

    if (body && method !== 'GET') {
      options.body = JSON.stringify(body);
    }

    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`${errorMessage} (HTTP status: ${response.status})`);
    }

    const data: T = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
};

export const formatDateString = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZoneName: "short"
  });
};
