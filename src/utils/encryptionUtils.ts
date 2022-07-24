import bcrypt from "bcrypt";
import { BCRYPT_SECRET_KEY } from "./constants.js";


function encryptWithBcrypt(data: string) {
    const encryptedData = bcrypt.hashSync(data, BCRYPT_SECRET_KEY);
    return encryptedData;
};

function validatePassword(password: string, encryptedPassword: string) {
    return bcrypt.compareSync(password, encryptedPassword);
};

const encryptionUtils = {
    encryptWithBcrypt,
    validatePassword
};

export default encryptionUtils;