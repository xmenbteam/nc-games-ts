import express, { Application } from "express";
import {
  handle500Errors,
  handleCustomErrors,
  handlePSQLErrors,
  handleInvalidPaths,
} from "./errors";
import apiRouter from "./routes/api.router";

const app: Application = express();

app.use(express.json());

app.use("/api", apiRouter);

app.all("/*", handleInvalidPaths);

app.use(handlePSQLErrors);
app.use(handleCustomErrors);
app.use(handle500Errors);

export default app;
