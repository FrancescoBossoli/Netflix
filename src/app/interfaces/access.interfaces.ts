import { User } from "./user.interface";

export interface AccessData {
    accessToken: string;
    user: User
}

export interface SignupData {
    name: string;
    surname: string;
    email: string;
    password: string;
}

export interface LoginData {
    email: string,
    password: string
}
