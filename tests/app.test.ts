import supertest from "supertest";
import app from "../src/app.js";
import prismaClient from "../src/config/database.js"
import testRepository from "../src/repositories/testRepository.js";
import userRepository from "../src/repositories/userRepository.js";
import testFactory from "./factories/testFactory.js";
import userFactory from "./factories/userFactory.js";

beforeEach(async () => {
    await prismaClient.$executeRaw`TRUNCATE TABLE users CASCADE`;
    await prismaClient.$executeRaw`TRUNCATE TABLE sessions`;
    await prismaClient.$executeRaw`TRUNCATE TABLE tests`;
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
        const loginData = { email: "teste@teste.com", password: "teste" };
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

describe("Test suite to create test", () => {
    it("Send a valid test - Expect 201", async () => {
        const signUpData = userFactory.createSignUpInfo();
        await supertest(app).post('/sign-up').send(signUpData);

        const loginData = { email: signUpData.email, password: signUpData.password };
        let response = await supertest(app).post('/sign-in').send(loginData);
        const token = response.body.token;

        const test = testFactory.validTest;
        response = await supertest(app).post('/tests').send(test).set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(201);

        const savedTest = await testRepository.findByName(test.name);
        expect(savedTest).not.toBeNull();
    });

    it("Send a invalid token - Expect 401", async () => {
        const token = "invalidToken";

        const test = testFactory.validTest;
        const response = await supertest(app).post('/tests').send(test).set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(401);
    });

    it("Send a test with empty body - Expect 422", async () => {
        const signUpData = userFactory.createSignUpInfo();
        await supertest(app).post('/sign-up').send(signUpData);

        const loginData = { email: signUpData.email, password: signUpData.password };
        let response = await supertest(app).post('/sign-in').send(loginData);
        const token = response.body.token;

        const test = {};
        response = await supertest(app).post('/tests').send(test).set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(422);

    });

    it("Send a test with an invalid category - Expect 404", async () => {
        const signUpData = userFactory.createSignUpInfo();
        await supertest(app).post('/sign-up').send(signUpData);

        const loginData = { email: signUpData.email, password: signUpData.password };
        let response = await supertest(app).post('/sign-in').send(loginData);
        const token = response.body.token;

        const test = { ...testFactory.validTest, categoryId: 100 };
        response = await supertest(app).post('/tests').send(test).set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(404);
    });

    it("Send a test with an invalid discipline and teacher combination 1 - Expect 404", async () => {
        const signUpData = userFactory.createSignUpInfo();
        await supertest(app).post('/sign-up').send(signUpData);

        const loginData = { email: signUpData.email, password: signUpData.password };
        let response = await supertest(app).post('/sign-in').send(loginData);
        const token = response.body.token;

        const test = { ...testFactory.validTest, disciplineId: 100 };
        response = await supertest(app).post('/tests').send(test).set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(404);
    });

    it("Send a test with an invalid discipline and teacher combination 2 - Expect 404", async () => {
        const signUpData = userFactory.createSignUpInfo();
        await supertest(app).post('/sign-up').send(signUpData);

        const loginData = { email: signUpData.email, password: signUpData.password };
        let response = await supertest(app).post('/sign-in').send(loginData);
        const token = response.body.token;

        const test = { ...testFactory.validTest, teacherId: 100 };
        response = await supertest(app).post('/tests').send(test).set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(404);
    });
});

describe("Test suite to get categories", () => {
    it("Get all categories", async () => {
        const signUpData = userFactory.createSignUpInfo();
        await supertest(app).post('/sign-up').send(signUpData);

        const loginData = { email: signUpData.email, password: signUpData.password };
        let response = await supertest(app).post('/sign-in').send(loginData);
        const token = response.body.token;

        response = await supertest(app).get("/categories").set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(200);
        expect(response.body).not.toBeNull();
    });

    it("Send a invalid token - Expect 401", async () => {
        const token = "invalidToken";
        const response = await supertest(app).get("/categories").set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(401);
    });
});

describe("Test suite to get tests group by disciplines and terms", () => {
    it("Get Tests Group By Disciplines and Terms", async () => {
        const signUpData = userFactory.createSignUpInfo();
        await supertest(app).post('/sign-up').send(signUpData);

        const loginData = { email: signUpData.email, password: signUpData.password };
        let response = await supertest(app).post('/sign-in').send(loginData);
        const token = response.body.token;

        const test = testFactory.validTest;
        await supertest(app).post('/tests').send(test).set('Authorization', `Bearer ${token}`);

        response = await supertest(app).get("/tests?groupBy=disciplines").set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(200);
        expect(response.body).not.toBeNull();
        expect(response.body.tests).not.toBeUndefined();
    });

    it("Send a invalid token - Expect 401", async () => {
        const token = "invalidToken";
        const response = await supertest(app).get("/tests?groupBy=disciplines").set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(401);
    });
});

describe("Test suite to get tests group by teachers", () => {
    it("Get Tests Group By Teachers", async () => {
        const signUpData = userFactory.createSignUpInfo();
        await supertest(app).post('/sign-up').send(signUpData);

        const loginData = { email: signUpData.email, password: signUpData.password };
        let response = await supertest(app).post('/sign-in').send(loginData);
        const token = response.body.token;

        const test = testFactory.validTest;
        await supertest(app).post('/tests').send(test).set('Authorization', `Bearer ${token}`);

        response = await supertest(app).get("/tests?groupBy=teachers").set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(200);
        expect(response.body).not.toBeNull();
        expect(response.body.tests).not.toBeUndefined();
    });

    it("Send a invalid token - Expect 401", async () => {
        const token = "invalidToken";
        const response = await supertest(app).get("/tests?groupBy=teachers").set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(401);
    });
});

afterAll(async () => {
    await prismaClient.$disconnect();
});