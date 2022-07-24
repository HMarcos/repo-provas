import { Session } from "@prisma/client";
import prismaClient from "../config/database.js";

export type SessionCreationData = Omit<Session, "id">;

async function insert(sessionCreationData: SessionCreationData) {
    const session = await prismaClient.session.create({ data: sessionCreationData });
    const sessionId = session.id;
    return sessionId;
};

async function findById(id: number) {
    const session = await prismaClient.session.findUnique({
        where: { id }
    });

    return session;
}

const sessionRepository = {
    insert,
    findById
};

export default sessionRepository;