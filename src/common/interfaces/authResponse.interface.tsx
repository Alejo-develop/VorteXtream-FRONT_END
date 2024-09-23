export interface AuthResponse {
  token: string;
  user: {};
  isPremium: boolean
}

export interface AuthResponseError {
  message: string;
}

export interface AuthResponseErrorSeveral {
  response: {};
}
