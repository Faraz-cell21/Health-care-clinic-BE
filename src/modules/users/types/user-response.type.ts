export interface UserResponse {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    userType: string;
    role: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}