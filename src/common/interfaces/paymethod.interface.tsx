export interface PayMethodResponse{
    id?: string | null;
    userId?: string | null;
    bankId?: string | null;
    cardNumber?: string | null;
    cvv?: string | null;
    expirationDate?: string | null;
    nameCardHolder?: string | null;
}