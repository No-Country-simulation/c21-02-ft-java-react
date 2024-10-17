export interface UserLogin {
    email: string;
    password: string;
}

export interface UserRegisterResponse {
    id: number,
    name: string,
    email: string,
    balance: number,
    userEnum: "USER" | "ADMIN" | "INVITED"
}

export interface UserProfile {
    id: number;
    name: string;
    image: string;
    email: string;
    createdAt: string;
}

export interface UserLoginResponse {
    id: number,
    email: string,
    jwt: string,
    role: string
}

export interface UserSessionPersistenceResponse {
    id: number,
    email: string,
    name: string,
    role: string
}