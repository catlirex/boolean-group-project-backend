import { Request, Response } from "express";
import  dbClient from "../../utils/database";

const {airport} = dbClient


export const getAllAirports = async (req: Request, res: Response) => {
    try {
            const allAirports = await airport.findMany();
            res.json({ data: allAirports });
          } catch (error) {
            console.log(error);
            res.json({ error: "Not working" });
          }
  };

