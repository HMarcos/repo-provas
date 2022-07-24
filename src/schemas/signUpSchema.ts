import joi from "joi";
import { SignUpData } from "../repositories/userRepository.js";

const signUpSchema = joi.object<SignUpData>({
    email: joi.string().email().required(),
    password: joi.string().required(),
    passwordConfirmation: joi.string().valid(joi.ref('password')).required().messages({ 'any.only': '{{#label}} does not match.' })
});

export default signUpSchema;