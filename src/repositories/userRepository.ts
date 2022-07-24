import { User } from "@prisma/client";
import prismaClient from "../config/database.js";

export type UserCreationData = Omit<User, "id">;
export type LoginData = Omit<User, "id">;

export type SignUpData = UserCreationData & {
    passwordConfirmation: string
};

async function findByEmail(email: string) {
    const user = await prismaClient.user.findUnique({
        where: {
            email
        }
    });

    return user;
};

async function findById(id: number) {
    const user = await prismaClient.user.findUnique({
        where: {
            id
        }
    });

    return user;
};

async function insert(user: UserCreationData) {
    await prismaClient.user.create({ data: user });
};

const userRepository = {
    findByEmail,
    findById,
    insert
};

export default userRepository;