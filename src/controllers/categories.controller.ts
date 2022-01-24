import { Request, Response, NextFunction } from "express";
import { fetchCategories, sendCategory } from "../models/categories.model";

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

export const postCategory = async (
  { body }: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { slug, description } = body;

    const category = await sendCategory(slug, description);

    res.status(201).send({ category });
  } catch (err) {
    next(err);
  }
};
