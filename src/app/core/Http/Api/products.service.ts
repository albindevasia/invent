import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

interface IProducts{
  id: number;
  name: string;
  price: number;
  sku: string;
  stock: number;
}

@Injectable({
    providedIn:'root'
})
export class ProductService{
    constructor(private readonly http:HttpClient){}

    public productApi:string='https://api-sales-app.josetovar.dev/products'

    public getProducts(){
        return this.http.get<IProducts>(`${this.productApi}`)
       }

       public getSingle(productId:number):any{
        return this.http.get(`${this.productApi}/${productId}`);
    }
    public updateSingeProduct(product: any) {
        return this.http.put(`${this.productApi}`, product)
         
      }
      public createNew(product:any){
        return this.http.post(`${this.productApi}`,product)
      }
}