import axios from "axios";
import CredentialsModel from "../Models/CredentialsModel";
import UserModel from "../Models/UserModel";
import { AuthActionType, authStore } from "../Redux/AuthState";
import appConfig from "../Utils/Config";

class AuthService {

    // Registering a new user: 
    public async register(user: UserModel): Promise<void> {

        const response = await axios.post<string>(appConfig.registerUrl, user);
        const token = response.data;
        authStore.dispatch({ type: AuthActionType.Register, payload: token });
    }


    // Login existing user: 
    public async login(credentials: CredentialsModel): Promise<void> {

        const response = await axios.post<string>(appConfig.loginUrl, credentials);
        const token = response.data;
        authStore.dispatch({ type: AuthActionType.Login, payload: token });
    }

    
    // Logout existing user:
    public logout(): void {
        authStore.dispatch({ type: AuthActionType.Logout });
    }

}

const authService = new AuthService();

export default authService;
