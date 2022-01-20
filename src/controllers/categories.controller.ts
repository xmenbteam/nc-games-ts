import { Request, Response, NextFunction } from "express";
import { fetchCategories } from "../models/categories.model";

export const getCategories = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const categories = await fetchCategories();
    res.status(200).send({ categories });
  } catch (err) {
    console.log({ err });
    next(err);
  }
};
