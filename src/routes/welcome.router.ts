import express, { Router } from "express";
import { getWelcome } from "../controllers/welcome.controller";

const welcomeRouter: Router = express.Router();

welcomeRouter.route("/").get(getWelcome);

export default welcomeRouter;
