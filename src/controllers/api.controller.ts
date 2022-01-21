import { Request, Response, NextFunction } from "express";

export const getApi = (req: Request, res: Response, next: NextFunction) => {
  try {
    res.status(200).send({ msg: "Api running!" });
  } catch (err) {
    console.log({ err });
    next(err);
  }
};
