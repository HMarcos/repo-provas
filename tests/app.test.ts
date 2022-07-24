import supertest from "supertest";
import app from "../src/app.js";
import prismaClient from "../src/config/database.js"
import userRepository from "../src/repositories/userRepository.js";
import userFactory from "./factories/userFactory.js";

beforeEach(async () => {
    await prismaClient.$executeRaw`TRUNCATE TABLE users CASCADE`;
    await prismaClient.$executeRaw`TRUNCATE TABLE sessions`;
});

describe("Sign up test suite", () => {
    it("Create a valid user", async () => {
        const signUpData = userFactory.createSignUpInfo();
        const response = await supertest(app).post('/sign-up').send(signUpData);
        expect(response.status).toBe(201);

        const newUser = await userRepository.findByEmail(signUpData.email);
        expect(newUser).not.toBeNull();
    });

    it("Send a user with empty body - Error 422", async () => {
        const response = await supertest(app).post('/sign-up').send({});
        expect(response.status).toBe(422);
    });

    it("Send a user with invalid passwordConfirmation - Error 422", async () => {
        let signUpData = userFactory.createSignUpInfo();
        signUpData = { ...signUpData, passwordConfirmation: "senhaAleatoria" };
        const response = await supertest(app).post('/sign-up').send(signUpData);
        expect(response.status).toBe(422);
    });

    it("Submit an existing user - Error 409", async () => {
        const signUpData = userFactory.createSignUpInfo();
        await supertest(app).post('/sign-up').send(signUpData);

        const response = await supertest(app).post('/sign-up').send(signUpData);
        expect(response.status).toBe(409);
    });
});

describe("Sign in test suite", () => {
    it("Send a valid login - Expect status 200 and token", async () => {
        const signUpData = userFactory.createSignUpInfo();
        await supertest(app).post('/sign-up').send(signUpData);

        const loginData = { email: signUpData.email, password: signUpData.password };
        const response = await supertest(app).post('/sign-in').send(loginData);
        const token = response.body.token;
        expect(response.status).toBe(200);
        expect(token).not.toBeNull();
    });

    it("Send a login without body - Error 422", async () => {
        const loginData = {};
        const response = await supertest(app).post('/sign-in').send(loginData);
        expect(response.status).toBe(422);
    });

    it("Send a login with an unregistered email - Error 401", async () => {
        const loginData = {email: "teste@teste.com", password: "teste"};
        const response = await supertest(app).post('/sign-in').send(loginData);
        expect(response.status).toBe(401);
    });

    it("Send a login with the incorrect password - Error 401", async () => {
        const signUpData = userFactory.createSignUpInfo();
        await supertest(app).post('/sign-up').send(signUpData);

        const loginData = { email: signUpData.email, password: "testeTeste" };
        const response = await supertest(app).post('/sign-in').send(loginData);
        expect(response.status).toBe(401);
    });

});


afterAll(async () => {
    await prismaClient.$disconnect();
})