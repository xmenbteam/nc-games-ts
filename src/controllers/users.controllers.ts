import { Request, Response, NextFunction } from "express";
import { RawUser } from "../Types/raw-data-types";
import { fetchUsers, sendUser } from "../models/users.model";

export const getUsers = async (
  { params }: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username } = params;
    const users = await fetchUsers(username);

    res.status(200).send({ users });
  } catch (err) {
    next(err);
  }
};

export const postUser = async (
  { body }: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await sendUser(body);

    res.status(201).send({ user });
  } catch (err) {
    next(err);
  }
};
