export interface LoginInput {
    email: string;
    password: string;
}

export interface TokenPayload {
    userId: string;
    email: string;
}