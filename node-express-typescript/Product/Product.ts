import express, { Request, Response, NextFunction } from "express";
const app = express();
const productRouter = express.Router();
productRouter.post('/add', (req:Request, res:Response)=>{
    res.send("product Added successfuly");
})

export {productRouter}