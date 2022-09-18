import { marketOrdersStore } from "../models/orders";

const store = new marketOrdersStore();
it("create an order", async () => {
  let createdOrder = await store.create(1, "active");
  expect(Number(createdOrder.customer_id)).toEqual(1);
});
it("create a product by order id", async () => {
  let createdOrder = await store.createProduct(1, 1, 5);
  expect(Number(createdOrder.order_id)).toEqual(1);
});
it("show returns the correct data by id", async () => {
  const result = await store.ordersShow("1");
  expect(result.id).toEqual(1);
});
it("show product info returns the correct data by id", async () => {
  const result = await store.ordersInfoShow("1");
  expect(result.id).toEqual(1);
});

it("all orders by customers", async () => {
  const result = await store.ordersIndex();
  expect(result.length).toEqual(1);
});

it("all product orders by customers", async () => {
  const result = await store.ordersInfoIndex();
  expect(result.length).toEqual(1);
});

it("show order by customer id", async () => {
  const result = await store.showByCustomerID("1");
  expect(result.id).toEqual(1);
});
