"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const customer_1 = require("../models/customer");
const store = new customer_1.marketCustomerStore();
it("create adds a new customer data", async () => {
    //create user#1
    const result = await store.create({
        firstName: "basel",
        lastName: "ashraf",
        password: "helloworld",
    });
    expect(result.password).not.toEqual("helloworld");
});
it("index returns a list of customer data", async () => {
    const customer = await store.create({
        firstName: "bassel",
        lastName: "ashraf",
        password: "hello-world",
    });
    const result = await store.index();
    expect(result.length).toBeGreaterThan(1);
});
it("show returns the correct data by id", async () => {
    const result = await store.show("1");
    expect(result.id).toEqual(1);
});
