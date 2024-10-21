export interface UserLogin {
    email: string;
    password: string;
}

export interface UserRegister {
    name: string;
    email: string;
    password: string;
    balance: number;
    userEnum: "ADMIN" | "USER" | "INVITED";
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
    name: string,
    email: string,
    profileImage: string,
    jwt: string,
    role: string
}

export interface UserSessionPersistenceResponse {
    id: number,
    email: string,
    name: string,
    profileImage: string,
    role: string
}