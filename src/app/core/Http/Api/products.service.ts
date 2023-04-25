import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Environment } from "src/Environment/environment";

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

    // public productApi:string='https://api-sales-app.josetovar.dev/products'

    public getProducts(){
        return this.http.get<IProducts>(`${Environment.api}/products`)
       }

       public getSingle(productId:number):any{
        return this.http.get(`${Environment.api}/products/${productId}`);
    }
    public updateSingeProduct(product: any) {
        return this.http.put(`${Environment.api}/products`, product)
         
      }
      public createNew(product:any){
        return this.http.post(`${Environment.api}/products`,product)
      }
}