"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const product_1 = require("../models/product");
const store = new product_1.marketProdcutStore();
it("creating a new product", async () => {
    const product = {
        price: 15,
        productName: "apple",
    };
    const createdproduct = await store.create(product);
    expect(createdproduct.price).toEqual(15);
});
it("index returns a list", async () => {
    const result = await store.index();
    expect(result.length).toBeGreaterThan(1);
});
it("show returns the correct model", async () => {
    const result = await store.show("1");
    expect(result.id).toEqual(1);
});
it("product updated as intended", async () => {
    const updatedOrder = await store.update({
        productName: "Apples",
        price: 5,
    }, "5");
    expect(updatedOrder).toEqual({
        id: 1,
        price: 5,
        productName: "Apples",
    }, "1");
});
it("delete deletes the correct model", async () => {
    const result = await store.delete("1");
    expect(result.id).toEqual(1);
});
