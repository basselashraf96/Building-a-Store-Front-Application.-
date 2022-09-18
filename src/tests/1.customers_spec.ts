import { marketCustomerStore } from "../models/customer";
import bcrypt from "bcrypt";
const pepper = process.env.BCRYPT_PASSWORD;
const store = new marketCustomerStore();

it("create adds a new customer data", async () => {
  //create user#1
  const result = await store.create({
    first_name: "basel",
    lastName: "ashraf",
    password: "helloworld",
  });
  expect(result.password).not.toEqual("helloworld");
});
it("create adds a new customer data", async () => {
  //create user#1
  const result = await store.create({
    first_name: "basel",
    lastName: "ashraf",
    password: "helloworld",
  });
  expect(result.password).not.toEqual("helloworld");
});

it("update created customer", async () => {
  const customer = {
    first_name: "kareem",
    lastName: "ashraf",
    password: "helloworld",
  };
  const result = await store.update(customer, "1");

  expect(result.first_name).toEqual("kareem");
});
it("index returns a list of customer data", async () => {
  const customer = await store.create({
    first_name: "bassel",
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
it("delete created customer", async () => {
  const result = await store.delete("2");
  expect(result.id).toEqual(2);
});
//
