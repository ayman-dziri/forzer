const STATIC_EMAIL = "aymandziri@gmail.com";
const STATIC_PASSWORD = "ayman123";
const TOKEN_KEY = "auth_token";

export const login = (email: string, password: string): boolean => {
    if (email === STATIC_EMAIL && password === STATIC_PASSWORD) {
        // Token statique (simple et suffisant pour le TP)
        const token = "STATIC_AUTH_TOKEN_12345";
        localStorage.setItem(TOKEN_KEY, token);
        return true;
    }
    return false;
};

export const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
};

export const isAuthenticated = (): boolean => {
    return !!localStorage.getItem(TOKEN_KEY);
};
