import { Request, Response, NextFunction } from "express"
const ShowParams = (req:Request, res:Response, next:NextFunction)=>{
    console.log(`this will only console on put ${JSON.stringify(req.body)}`);
    next();
}
export default ShowParams;