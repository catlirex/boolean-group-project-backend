import { Request, Response } from "express";
import  dbClient from "../../utils/database";

const {user} = dbClient



export const deleteUserById = async (req:Request, res:Response) => {
    const id = parseInt(req.params.id);
    try {
      const deletedUser = await user.delete({
        where: { id },
      });
      res.json({ data: deletedUser });
    } catch (error) {
      res.json({ error: "Not working" });
    }
  };