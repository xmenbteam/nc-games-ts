import { Request, Response, NextFunction } from "express";

export const getWelcome = (req: Request, res: Response, next: NextFunction) => {
  try {
    res
      .status(200)
      .send({
        msg: "Hello! Welcome to Sam's TypeScript NC Games API! Go to /api to see possible endpoints!",
      });
  } catch (err) {
    next(err);
  }
};
