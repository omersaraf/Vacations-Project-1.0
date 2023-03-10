class Config {
    public vacationsUrl = "http://localhost:3001/api/vacations/";
    public vacationImagesUrl = "http://localhost:3030/api/vacations/images/";
    public registerUrl = "http://localhost:3030/api/auth/register/";
    public loginUrl = "http://localhost:3030/api/auth/login/";
}

const appConfig = new Config(); // Singleton

export default appConfig;
