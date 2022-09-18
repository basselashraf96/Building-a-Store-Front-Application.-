"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const orders_1 = require("../models/orders");
const store = new orders_1.marketOrdersStore();
it("create an order", async () => {
    let createdOrder = await store.create(1, "active");
    expect(Number(createdOrder.customer_id)).toEqual(1);
});
it("show returns the correct data by id", async () => {
    const result = await store.ordersShow("1");
    expect(result.id).toEqual(1);
});
it("all orders by customers", async () => {
    const result = await store.ordersIndex();
    expect(result.length).toBeGreaterThan(1);
});
