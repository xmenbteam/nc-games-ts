import { Request, Response, NextFunction } from "express";

export const handlePSQLErrors = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  switch (err.code) {
    case "23502":
      res.status(400).send({ msg: "Field cannot be null!", err });
    case "22P02":
      res.status(400).send({ msg: "Bad request!", err });
    case "23503":
      res.status(404).send({ msg: "Not found!", err });
    case "22003":
      res.status(404).send({ msg: "Comment not found!", err });
    default:
      next(err);
  }
};

export const handleCustomErrors = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err.status) res.status(err.status).send({ msg: err.msg });
  else next(err);
};

export const handle500Errors = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(500).send({ msg: "Internal server error!" });
};
