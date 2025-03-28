const AuthMessage: { [key: string]: string } = Object.freeze({
    USER_NOT_FOUND: "User not found",
    FIELD_VALIDATION: "There was an error validating the sent information",
    FIELD_LOGIN: "Invalid username or password!",
    LOGIN_SUCCESS: "Login successfully.",
    FIELD_TOKEN: "Create token field!",
    FIELD_REFRESH_TOKEN: "Create refresh token field!",
    FIELD_PRIVATE_KEY: "Private key not set",
    CREATE_REFRESH_TOKEN_SUCCESS: "Create refresh token successfully."
});

export default AuthMessage;
