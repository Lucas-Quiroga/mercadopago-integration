import Express from "express";
import morgan from "morgan";
import paymentRoutes from "./routes/paymentRoutes.js";
import { PORT } from "./config.js";
import cors from "cors";
import path from "path";

const app = Express();
app.use(cors());

app.use(morgan("dev"));

app.use(paymentRoutes);

app.use(Express.static(path.resolve("src/public")));

app.listen(PORT);
console.log("server on port", PORT);
