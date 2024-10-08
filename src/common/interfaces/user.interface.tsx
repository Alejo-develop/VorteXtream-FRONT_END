export interface UserPayload {
    name: string | undefined;
    id: string;
    username: string;
    email: string;
    country: string;
    prefixCountry: string;
    role: string;
    urlprofile: string;
}

export interface UserResponse{
    bornDate: string | null ;
    country: string | null;
    prefixCountry: string | null;
    email: string | null;
    id: string | null;
    lastName: string | null;
    name: string | null;
    phoneNumber: string | null;
    secondName: string | null;
    urlprofile: string | null;
    username:string | null;
}