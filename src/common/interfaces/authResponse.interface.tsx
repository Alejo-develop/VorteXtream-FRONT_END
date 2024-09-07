export interface AuthResponse {
    body: {
        token: string
    }
}

export interface AuthResponseError {
    body: {
        error: string
    }
}