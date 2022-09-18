import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import productRoutes from "./handler/market_products";
import CustomerRoutes from "./handler/market_cutomer";
import orderRoutes from "./handler/market_orders";

const app: express.Application = express();
const address: string = "0.0.0.0:3000";

app.use(bodyParser.json());

app.get("/", function (req: Request, res: Response) {
  res.send("Hello World!");
});

app.listen(3000, function () {
  console.log(`starting app on: ${address}`);
});

productRoutes(app);
CustomerRoutes(app);
orderRoutes(app);
export default app;
