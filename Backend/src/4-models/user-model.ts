import Joi from "joi";
import RoleModel from "./role-model";


class UserModel {
    public userId: number;
    public role: RoleModel;
    public firstName: string;
    public lastName: string;
    public username: string;
    public password: string;

    public constructor (user: UserModel) {
        this.userId = user.userId;
        this.role = RoleModel.User;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.username = user.username;
        this.password = user.password;
    }

    public static validationSchema = Joi.object({
        id: Joi.number().optional().integer().positive(),
        firstName: Joi.string().required().min(2).max(20),
        lastName: Joi.string().required().min(2).max(20),
        username: Joi.string().required().min(4).max(20),
        password: Joi.string().required().min(4).max(20),
        role: Joi.forbidden() // check later...
    });

    public validate(): string {
        const result = UserModel.validationSchema.validate(this);
        return result.error?.message;
    }
}

export default UserModel;