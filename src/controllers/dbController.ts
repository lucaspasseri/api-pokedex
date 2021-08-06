import { Request, Response } from "express";
import * as dbService from "../services/dbService";

export async function populate(req: Request, res: Response) {
    try {
        await dbService.populate(251);

        res.sendStatus(201);

    } catch(err) {
        console.log(err);
        res.sendStatus(500);
    }
}