const AuthMessage: { [key: string]: string } = Object.freeze({
    userNotFound: "user not found",
    otpNotResendAgain: "otp send! please try later!",
    fieldValidation: "There was an error validating the sent information",
    loginField: "username or password not correct!",
    loginSuccess: "login successfully.",
    tokenField: "create token field!",
    refreshTokenField: "create refresh token field!",
    privateKeyNotSet: "Private key not set",
    createRefreshTokenSuccess: "create fresh token successfully."
});

export default AuthMessage;
