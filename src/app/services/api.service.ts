import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn:'root'
})

export class ApiService{
    constructor(private readonly http:HttpClient){}

    public apiUrl:string='https://api-sales-app.josetovar.dev';
    public getSingle(productId:number):any{
        return this.http.get(`${this.apiUrl}/products/${productId}`);
    }

    public updateSingeProduct(product: any) {
        return this.http.put(`https://api-sales-app.josetovar.dev/products`, product)
         
      }

      public createNew(product:any){
        return this.http.post(`${this.apiUrl}/products`,product)
      }

}