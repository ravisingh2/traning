import { Request, Response, NextFunction } from "express"
const Logger = (req:Request, res:Response, next:NextFunction)=>{
    console.log(`Method:${req.method} Request:${req.url} Time: ${new Date().toLocaleString()}`);

    next();
}
export default Logger;