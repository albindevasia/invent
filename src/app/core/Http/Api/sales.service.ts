import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn:'root'
})
export class SalesService{
    constructor(private readonly http:HttpClient){} 
    public saleApi:string='https://api-sales-app.josetovar.dev/sales'

    public getSales(){
        return this.http.get(this.saleApi)
      }

    
public viewSale(sale_id:any){
    return this.http.get(`${this.saleApi}/${sale_id}`)
    }  
    createSale(sale:any){
        return this.http.post(`${this.saleApi}`, sale);
      }
}