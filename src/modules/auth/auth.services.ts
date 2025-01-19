import createHttpError from "http-errors";
import { verifyPassword } from "../../utils/passwordFormatter";
import { UserModel } from "../user/user.model";
import AuthMessage from "./auth.message";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
import redis from "../../config/redis.config";

dotenv.config();


interface UserType {
    firstname: string;
    lastname: string;
    mobile: string;
    password?: string;
}


class AuthServices {
    private model: typeof UserModel;

    constructor() {
        this.model = UserModel;
    }

    async login(username: string, password: string) {
        const user = (await this.#findUserByMobile(username)) as UserType | null;
        if (user && user.password) {
            const result = verifyPassword(password, user.password);
            if (result) {
                const payload = {
                    firstname: user.firstname,
                    lastname: user.lastname,
                    mobile: user.mobile
                };
                const token = this.#createToken(payload);
                if (token) {
                    const refreshToken = await this.#createRefreshToken(payload);
                    return {
                        ...payload,
                        accessToken: token,
                        refreshToken: refreshToken,
                        type: "Bearer",
                        expiresIn: 600,
                    };
                }

                throw new createHttpError.Unauthorized(AuthMessage.tokenField);
            }
        }
        throw new createHttpError.Unauthorized(AuthMessage.loginField);
    }


    async sendOTP(phoneNumber: string) {
        try {
            // Example logic for sending OTP
            // Ensure phoneNumber is valid and handle OTP generation
            // const user = await this.model.findOne({ phoneNumber });
            // if (user) {
            //     // Generate and send OTP
            // }
        } catch (error) {
            console.error('Error sending OTP:', error);
            throw new Error('Failed to send OTP');
        }
    }

    async checkOTP(phoneNumber: string, code: string) {
        try {
            // Example logic for checking OTP
            // Ensure phoneNumber and code are valid
            // const user = await this.model.findOne({ phoneNumber });
            // if (user && user.otp === code) {
            //     // OTP is correct, proceed with further actions
            // } else {
            //     throw new Error('Invalid OTP');
            // }
        } catch (error) {
            console.error('Error checking OTP:', error);
            throw new Error('Failed to check OTP');
        }
    }

    async #findUserByMobile(username: string) {
        const user = await this.model.findOne({ where: { mobile: username }, raw: true });
        return user;
    }

    #createToken(payload: Object) {
        const PrivateKey = process.env.API_PRIVATE_KEY;
        const options = {
            expiresIn: 60 * 10
        }
        if (!PrivateKey) throw new createHttpError.InternalServerError(AuthMessage.privateKeyNotSet);

        const token = jwt.sign(payload, PrivateKey, options);
        if (token) return token;
        throw new createHttpError.InternalServerError(AuthMessage.tokenField);
    }

    async #createRefreshToken(payload: Object) {
        const PrivateKey = process.env.API_REFRESH_PRIVATE_KEY;
        const options = {
            expiresIn: 60 * 60
        }
        if (!PrivateKey) throw new createHttpError.InternalServerError(AuthMessage.privateKeyNotSet);


        const refreshToken = jwt.sign(payload, PrivateKey, options);
        if (refreshToken) return refreshToken;
        throw new createHttpError.InternalServerError(AuthMessage.refreshTokenField);
    }

    async verifyRefreshToken(refreshToken: string) {
        try {
            const PrivateRefreshKey = process.env.API_REFRESH_PRIVATE_KEY;
            if (!PrivateRefreshKey) throw new createHttpError.InternalServerError(AuthMessage.privateKeyNotSet);
            const payload = jwt.verify(refreshToken, PrivateRefreshKey);
            if (payload && typeof payload === 'object' && 'mobile' in payload) {
                const user = (await this.model.findOne({ where: { mobile: payload.mobile }, raw: true })) as UserType | null;
                if (!user) throw new createHttpError.Unauthorized(AuthMessage.userNotFound);

                const data: UserType = {
                    firstname: user.firstname,
                    lastname: user.lastname,
                    mobile: user.mobile
                };

                const newToken = this.#createToken(data);
                if (newToken) {
                    return {
                        accessToken: newToken,
                        type: "Bearer",
                        expiresIn: 600,
                    };
                }
            }
        } catch (error) {
            throw new createHttpError.Unauthorized(AuthMessage.refreshTokenField);
        }
    }
}

export default new AuthServices();
