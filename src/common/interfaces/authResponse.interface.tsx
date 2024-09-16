export interface AuthResponse {
  token: string;
  user: {};
  isPremium: boolean
}

export interface AuthResponseError {
  error: string;
}
