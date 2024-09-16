export interface UserPayload {
    id: string;
    username: string;
    email: string;
    country: string;
    role: string;
    urlprofile: string;
}

export interface UserResponse{
    bornDate: Date | null ;
    country: string | null;
    email: string | null;
    id: string | null;
    lastName: string | null;
    name: string | null;
    phoneNumber: string | null;
    role: string | null;
    secondName: string | null;
    urlProfile: string | null;
    username:string | null;
}