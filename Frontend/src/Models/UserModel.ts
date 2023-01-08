import RoleModel from "./RoleModel";

class UserModel {
    public id: number;
    public role: RoleModel;
    public firstName: string;
    public lastName: string;
    public username: string;
    public password: string;
}

export default UserModel;