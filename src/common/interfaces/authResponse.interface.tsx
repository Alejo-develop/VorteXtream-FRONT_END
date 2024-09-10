export interface AuthResponse {
    token: string,
    user: {}

}

export interface AuthResponseError {
    body: {
        error: string
    }
}