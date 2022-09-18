import { marketProdcutStore } from "../models/product";

const store = new marketProdcutStore();

it("creating a new product", async () => {
  const product = {
    price: 15,
    product_name: "Apples",
  };
  const createdproduct = await store.create(product);
  expect(createdproduct.price).toEqual(15);
});
it("creating a new product", async () => {
  const product = {
    price: 15,
    product_name: "Apples",
  };
  const createdproduct = await store.create(product);
  expect(createdproduct.price).toEqual(15);
});
it("update the created product", async () => {
  const result = await store.update(
    {
      product_name: "Apples",
      price: 15,
    },
    "1"
  );
  expect(result).toEqual(
    {
      id: 1,
      price: 15,
      product_name: "Apples",
    },
    "1"
  );
});
it("delete deletes the correct model", async () => {
  const result = await store.delete("2");
  expect(result.id).toEqual(2);
});
it("index returns a list", async () => {
  const result = await store.index();
  expect(result.length).toEqual(1);
});

it("show returns the correct model", async () => {
  const result = await store.show("1");
  expect(result.id).toEqual(1);
});
