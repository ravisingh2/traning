import { validationResult} from 'express-validator';
import { Request, Response, NextFunction } from 'express';
export const productValidator = (req:Request, res:Response, next:NextFunction)=>{
    const errors = validationResult(req)
    let errMsg = errors.array().map(error => error.msg);
    if(errors.isEmpty()){
        next();
    }
    res.status(422).json({errors: errMsg});
}

export default productValidator;
  