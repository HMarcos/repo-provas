import { faker } from "@faker-js/faker";
import { SignUpData } from "../../src/repositories/userRepository.js";

function createSignUpInfo() {
    const signUpData: SignUpData = {
        email: faker.internet.email(),
        password: faker.internet.password(),
        get passwordConfirmation() { return this.password }
    };

    return signUpData;
};

const userFactory = {
    createSignUpInfo,
};

export default userFactory;

