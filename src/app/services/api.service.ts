import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

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

public api:string='https://api-sales-app.josetovar.dev/clients'
public saleApi:string='https://api-sales-app.josetovar.dev/sales'
public updateClient(client:any){
  return this.http.put(`${this.api}`,client)
}
public clientNew(client:any){
 return this.http.post(`${this.api}`,client)
}

public getSales(){
  return this.http.get(this.saleApi)
}

public viewSale(sale_id:any){
return this.http.get(`${this.saleApi}/${sale_id}`)
}
public addClient() {
return  this.http.get<{
    id: number;
    first_name: string;
    last_name: string;
    address: string;
    city: string;
    state: string;
    country: string;
    phone: number;
    email: string;
  }>(`https://api-sales-app.josetovar.dev/clients`);
}

public getProducts(){
 return this.http.get<{
    id: number;
    name: string;
    price: number;
    sku: string;
    stock: number;
  }>(`https://api-sales-app.josetovar.dev/products`)
}

public getAuthr(){
return this.http.get(`${this.apiUrl}/auth`,{});
}

public getQuick(){
  return this.http.get(`${this.apiUrl}/quick-sales`)
}
public getById(quickSaleId:number){
return this.http.get(`${this.apiUrl}/quick-sales/${quickSaleId}`)
}
}