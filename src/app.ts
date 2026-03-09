import express from "express";
import dotenv from "dotenv";
import { routes } from "./routes";
import { errorMiddleware } from "./infrastructure/http/middlewares/errorMiddleware";
import { notFoundMiddleware } from "./infrastructure/http/middlewares/notFoundMiddleware";

dotenv.config();

export const app = express();

app.use(express.json());
app.use(routes);
app.use(notFoundMiddleware);
app.use(errorMiddleware);

