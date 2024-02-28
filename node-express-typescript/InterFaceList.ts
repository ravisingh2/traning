interface categoryType {
    id:number;
    name:string;
}
interface Product {
    id:number;
    category_id:number;
    name:string;
  }

interface Employees{
    id: number;
    name: string;
    email: string;
}  
  export{categoryType, Product, Employees};