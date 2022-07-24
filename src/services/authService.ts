import { SessionCreationData } from "../repositories/sessionRepository.js";
import { LoginData, UserCreationData } from "../repositories/userRepository.js";
import AppError from "../utils/appError.js";
import encryptionUtils from "../utils/encryptionUtils.js";
import { generateToken } from "../utils/jwtUtils.js";
import sessionService from "./sessionService.js";
import userService from "./userService.js";

async function signUp(user: UserCreationData) {
    const existingUser = await userService.getByEmail(user.email);
    if (existingUser) {
        throw new AppError(409, 'E-mail already registered.');
    };

    const encryptedPassword = encryptionUtils.encryptWithBcrypt(user.password);
    const newUser: UserCreationData = {
        ...user,
        password: encryptedPassword
    };

    await userService.register(newUser);
};

async function signIn(login: LoginData) {
    const user = await userService.getByEmail(login.email);

    if (!user || !encryptionUtils.validatePassword(login.password, user.password)) {
        throw new AppError(401, "Email or password is incorrect!");
    };

    const sessionData: SessionCreationData = { userId: user.id };
    const sessionId = await sessionService.register(sessionData);
    const token = generateToken(sessionId);

    return token;

};

const authService = {
    signUp,
    signIn
};

export default authService;
