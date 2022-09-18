"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const market_products_1 = __importDefault(require("./handler/market_products"));
const market_cutomer_1 = __importDefault(require("./handler/market_cutomer"));
const market_orders_1 = __importDefault(require("./handler/market_orders"));
const app = (0, express_1.default)();
const address = "0.0.0.0:3000";
app.use(body_parser_1.default.json());
app.get("/", function (req, res) {
    res.send("Hello World!");
});
app.listen(3000, function () {
    console.log(`starting app on: ${address}`);
});
(0, market_products_1.default)(app);
(0, market_cutomer_1.default)(app);
(0, market_orders_1.default)(app);
exports.default = app;
