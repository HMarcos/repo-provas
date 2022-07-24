import sessionRepository from "../repositories/sessionRepository.js";
import { SessionCreationData } from "../repositories/sessionRepository.js";
import * as jwtUtils from "../utils/jwtUtils.js";

async function register(session: SessionCreationData) {
    const sessionId = await sessionRepository.insert(session);
    return sessionId;
};

function getSessionIdByToken(token: string) {
    return jwtUtils.getSesionIdByToken(token);
};

async function getById(id: number) {
    const session = await sessionRepository.findById(id);
    return session;
};

const sessionService = {
    register,
    getSessionIdByToken,
    getById
};

export default sessionService;