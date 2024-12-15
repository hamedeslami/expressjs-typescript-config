import { hashPassword } from "../../utils/password";
import { UserModel } from "./user.model";
import createHttpError from "http-errors";
import UserMessage from "./user.message";

interface UserType {
    firstname: string,
    lastname: string,
    mobile: string,
    password: string
}

class UserServices {
    private model: typeof UserModel;

    constructor() {
        this.model = UserModel;
    }

    async create(user: UserType) {
        const isUser = await this.model.findOne({ where: { mobile: user.mobile }, raw: true });
        if (!isUser) {
            const password = hashPassword(user.password);
            const result = await this.model.create({
                firstname: user.firstname,
                lastname: user.lastname,
                mobile: user.mobile,
                password: password
            });
            return result;
        }
        throw new createHttpError.BadRequest(UserMessage.userExist);
    }
}

export default new UserServices();