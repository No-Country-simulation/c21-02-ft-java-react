export interface UserLogin {
    email: string;
    password: string;
}

export interface UserRegister {
    name: string;
    password: string;
    balance: number;
    email: string;
    userEnum: "ADMIN" | "USER" | "INVITED";
}

export interface UserProfile {
    id: number;
    name: string;
    image: string;
    email: string;
    createdAt: string;
}