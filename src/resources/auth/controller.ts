import { Request, Response } from "express";
import { error } from "node:console";
import { findUserWithValidation, createdWithHash } from "./services";

import { createToken } from "../../utils/authGenerator";

export const loginUser = async (req: Request, res: Response) => {
  const userCreds = req.body;

  try {
    const loggedUser = await findUserWithValidation(userCreds);

    const token = createToken({
      id: loggedUser.id,
      email: loggedUser.email,
    });

    res.cookie("token", token, { httpOnly: true });

    res.json({
      user: {
        id: loggedUser.id,
        role: loggedUser.role,
        username: loggedUser.userName,
        email: loggedUser.email,
      },
    });
  } catch (error) {
    res.status(401).json({ error: error });
  }
};

export const logOutUser = async (req: Request, res: Response) => {
  res.clearCookie("token");
  res.json({ user: null });
};

export const createUser = async (req: Request, res: Response) => {
  const newUser = req.body;

  try {
    const savedUser = await createdWithHash(newUser);

    const token = createToken({
      id: savedUser.id,
      email: savedUser.email,
    });
    res.cookie("token", token, { httpOnly: true });

    res.json({
      user: {
        firstName: savedUser.firstName,
        lastName: savedUser.lastName,
        email: savedUser.email,
      },
    });
  } catch (error) {
    console.log(error);

    // if (error.message.includes('Unique constraint failed'))
    res.status(400).json({ error: "username/email exists" });
  }
};
