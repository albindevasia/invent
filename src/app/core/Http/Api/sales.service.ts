import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Environment } from "src/Environment/environment";

@Injectable({
    providedIn:'root'
})
export class SalesService{
    constructor(private readonly http:HttpClient){} 
    // public saleApi:string='https://api-sales-app.josetovar.dev/sales'

    public getSales(){
        return this.http.get(`${Environment.api}/sales`)
      }

    
public viewSale(sale_id:any){
    return this.http.get(`${Environment.api}/sales/${sale_id}`)
    }  
    createSale(sale:any){
        return this.http.post(`${Environment.api}/sales`, sale);
      }
}