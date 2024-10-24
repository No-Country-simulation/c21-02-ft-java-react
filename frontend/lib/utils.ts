import { HttpMethod } from "@/types/httpMethods";
import { UserLogin, UserRegister, UserProfile } from "@/types/user";
import { LobbyCreation } from "@/types/lobby";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const fetchData = async <T>(
  url: string,
  errorMessage: string = 'An error has occurred',
  method: HttpMethod = 'GET',
  body: UserLogin | UserRegister | UserProfile | LobbyCreation | null = null,
  token: string | null = null
): Promise<T> => {
  try {
    const options: RequestInit = {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` })
      },
    };

    if (body && method !== 'GET') {
      options.body = JSON.stringify(body);
    }

    console.log('Fetching URL:', url);
    console.log('HTTP Method:', method);
    console.log('Request Options:', options);
    if (body && method !== 'GET') {
      console.log('Request Body:', body);
      options.body = JSON.stringify(body);
    }
    const response = await fetch(url, options);

    console.log('Response Status:', response.status);
    console.log('Response Headers:', response.headers);

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
