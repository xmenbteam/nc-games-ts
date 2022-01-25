import { Request, Response, NextFunction } from "express";
import { endPoints } from "../endpoints";

export const getApi = (req: Request, res: Response, next: NextFunction) => {
  try {
    res.status(200).send({ endPoints });
  } catch (err) {
    console.log({ err });
    next(err);
  }
};
