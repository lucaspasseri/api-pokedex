import { Request, Response, NextFunction } from "express";
import * as userService from "../services/userService";

export async function middlewareAuthenticate(req: Request, res: Response, next: NextFunction){
    const authorization = req.header("Authorization");

    if(!authorization) return res.sendStatus(401);
    
    const token = authorization.split("Bearer ")[1];

    const validUser= await userService.authenticate(token);

    if(!validUser) return res.sendStatus(401);

    res.locals.user = validUser;
    next();
}