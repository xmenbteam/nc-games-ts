import express, { Application } from "express";
import cors from "cors";
import {
  handle500Errors,
  handleCustomErrors,
  handlePSQLErrors,
  handleInvalidPaths,
} from "./errors";
import apiRouter from "./routes/api.router";
import welcomeRouter from "./routes/welcome.router";

const app: Application = express();

app.use(express.json());
app.use(cors());

app.use("/", welcomeRouter);
app.use("/api", apiRouter);

app.all("/*", handleInvalidPaths);

app.use(handlePSQLErrors);
app.use(handleCustomErrors);
app.use(handle500Errors);

module.exports = app;
