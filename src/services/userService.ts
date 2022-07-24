import userRepository, { UserCreationData } from "../repositories/userRepository.js";

async function getByEmail(email: string) {
    const user = await userRepository.findByEmail(email);
    return user;
};

async function getById(id: number) {
    const user = await userRepository.findById(id);
    return user;
};

async function register(user: UserCreationData) {
    await userRepository.insert(user);
};

const userService = {
    getByEmail,
    getById,
    register
};

export default userService;