"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../server"));
const request = (0, supertest_1.default)(server_1.default);
let token;
/******************************************products routes testing************************************/
it("/products/:id get request response = 200", async () => {
    const response = await request.get("/products/1");
    expect(response.status).toBe(200);
});
it("/products get request response = 200", async () => {
    const response = await request.get("/products");
    expect(response.status).toBe(200);
});
it("products post request with token response = 200", async () => {
    const customer = {
        firstName: "basel",
        lastName: "ashraf",
        password: "helloworld",
    };
    const responses = await request
        .post("/customers")
        .send(customer)
        .set("Authorization", `Bearer ${token}`);
    token = responses.body;
    const product = {
        product_name: "banana",
        price: 25,
    };
    let response = await request
        .post("/products")
        .send(product)
        .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
});
it("products delete request with token response = 200", async () => {
    const customer = {
        firstName: "basel",
        lastName: "ashraf",
        password: "helloworld",
    };
    const responses = await request
        .post("/customers")
        .send(customer)
        .set("Authorization", `Bearer ${token}`);
    token = responses.body;
    const product = {
        product_name: "banana",
        price: 25,
    };
    let response = await request
        .delete("/products/2")
        .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
});
it("products put request with token response = 200", async () => {
    const customer = {
        firstName: "basel",
        lastName: "ashraf",
        password: "helloworld",
    };
    const responses = await request
        .post("/customers")
        .send(customer)
        .set("Authorization", `Bearer ${token}`);
    token = responses.body;
    const product = {
        product_name: "banana",
        price: 25,
    };
    let response = await request
        .put("/products/2")
        .send(product)
        .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
});
/***************************************************************************************************/
/******************************************customers routes testing************************************/
it("/customers post request response = 200 and returns token", async () => {
    const customer = {
        firstName: "basel",
        lastName: "ashraf",
        password: "helloworld",
    };
    const response = await request.post("/customers").send(customer);
    token = response.body;
    expect(response.status).toBe(200);
});
it("/customers get request with token response = 200", async () => {
    const response = await request
        .get("/customers")
        .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
});
it("/customers/:id get request with token response = 200", async () => {
    const response = await request
        .get("/customers/1")
        .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
});
it("customers delete request with token response = 200", async () => {
    const customer = {
        firstName: "basel",
        lastName: "ashraf",
        password: "helloworld",
    };
    const responses = await request
        .post("/customers")
        .send(customer)
        .set("Authorization", `Bearer ${token}`);
    token = responses.body;
    let response = await request
        .delete("/customers/2")
        .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
});
it("customers put request with token response = 200", async () => {
    const customer = {
        firstName: "basel",
        lastName: "ashraf",
        password: "helloworld",
    };
    const responses = await request
        .post("/customers")
        .send(customer)
        .set("Authorization", `Bearer ${token}`);
    token = responses.body;
    let response = await request
        .put("/products/2")
        .send(customer)
        .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
});
/***************************************************************************************************/
/******************************************orders routes testing************************************/
it("/orders post request with token response = 200 ", async () => {
    const order = {
        customer_id: "1",
        orderStatus: "active",
    };
    const response = await request
        .post("/orders")
        .send(order)
        .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
});
it("/orders/create-product post request with token response = 200 ", async () => {
    const order = {
        order_id: "1",
        customer_id: "1",
        quantity: 10,
    };
    const response = await request
        .post("/orders/create-product")
        .send(order)
        .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
});
it("/orders get request with token response = 200", async () => {
    const response = await request
        .get("/orders")
        .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
});
it("/orders/:id get request with token response is 200", async () => {
    const response = await request
        .get("/orders/1")
        .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
});
it("/orders/info get request with token response = 200", async () => {
    const response = await request
        .get("/orders/info")
        .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
});
it("/orders/info/:id get request with token response is 200", async () => {
    const response = await request
        .get("/orders/info/1")
        .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
});
