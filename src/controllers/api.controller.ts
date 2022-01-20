import { Request, Response, NextFunction } from "express";

export const getApi = (req: Request, res: Response, next: NextFunction) => {
  try {
    res.sendStatus(200).send({ msg: "Api running!" });
  } catch (err) {
    next(err);
  }
};
