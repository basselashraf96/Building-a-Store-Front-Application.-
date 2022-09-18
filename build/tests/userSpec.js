"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const product_1 = require("../models/product");
const store = new product_1.marketProdcutStore();
//Testing if product methods are defined
it("product index method defined", () => {
    expect(store.index).toBeDefined();
});
