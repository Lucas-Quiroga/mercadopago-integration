import Express from "express";
import morgan from "morgan";
import paymentRoutes from "./routes/paymentRoutes.js";
import { PORT } from "./config.js";
import cors from "cors";

const app = Express();
app.use(cors());

app.use(morgan("dev"));

app.use(paymentRoutes);

app.listen(PORT);
console.log("server on port", PORT);
