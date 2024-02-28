import express, { Express, Request, Response , Application } from 'express';
import Logger from "./Logger";
import ShowParams from './ShowParams';
import { port } from './Constant';
//import {categoryList, productList} from './CategoryList';
import { categoryType, Product} from "./InterFaceList";
import {productValidator} from './Validator'
import ValidateProduct from './productValidator'
let data = require('./data.json');
let categoryList:categoryType[] = data.categoryList;
let productList:Product[] = data.productList;


const app: Application = express();
/*interface categoryType {
    id:number;
    name:string;
}*/

app.use(express.json());
app.use(Logger);
//const categoryList:categoryType[] = [{id:1, name:"fruit"}, {id:2, name:"veg"}];

app.get('/', (req: Request, res: Response) => {
  res.send('Typescirpt');
});

app.get('/categories', (req: Request, res: Response) => {
    res.send(categoryList);
  });
app.post('/categories', ShowParams, (req: Request, res: Response) => {
    
    categoryList.push(req.body)
    res.send(categoryList);
  });  

app.delete('/categories/:id', (req: Request, res: Response) => {
    console.log(req.params, "Delete");
    let id:number = req.params.id as unknown as number;
    let filterCat:categoryType[] = categoryList.filter((category:categoryType)=>category.id != id);
    res.send(filterCat);
  });
  
  app.get('/product', (req: Request, res: Response) => {
    res.send(productList);
  });
  app.patch('/product',  (req: Request, res: Response) => {
    let reqData = req.body as Product;  
    let productRes:Product[] = productList.map(product=>{
        if(product.id == reqData.id){
            product.category_id = reqData.category_id;
            product.name = reqData.name;
        }
        return product;
    })
    res.send(productRes);
  });  
  app.put('/product', productValidator, ValidateProduct, (req: Request, res: Response) => {
    let reqData = req.body as Product;  
    let updateFlag:boolean = false;
    productList.map((product, index)=>{
          if(product.id == reqData.id){
            productList[index].category_id = reqData.category_id;
              productList[index].name = reqData.name;
              updateFlag = true;
          }
          return product;
      })
      if(!updateFlag){
        productList.push(reqData);
      }
    
    res.send(productList);
  });
  app.post('/product',  (req: Request, res: Response) => {
    let reqData = req.body as Product;
    let filteredProduct:Product[] = productList.filter(product=>{
      return product.id == reqData.id
    })
    console.log(filteredProduct, "filteredProduct", filteredProduct.length);
      if(filteredProduct.length == 0){
         productList.push(reqData);
      }
    
    res.send(productList);
  });    
  app.delete('/product/:id',  (req: Request, res: Response) => {
    console.log(req.params, "Delete");
    let id:number = req.params.id as unknown as number;
    productList.forEach((item, index)=>{
      if(item.id == id){
        productList.splice(index, 1);
      }
    })
    res.send(productList);
  });
  app.post("/registerEmployee", (req:Request, res:Response)=>{
    const { name, email } = req.body;
    
  })  

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});