import { body} from 'express-validator';
export const productValidator = [
    body('id', 'Id is mandatory').not().isEmpty(),
    body('category_id', 'Invalid category_id').notEmpty(),
    body('name', 'The minimum name length should be between 6 to 12').isLength({min: 6, max:12}),
  ]