import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Environment } from "src/Environment/environment";

@Injectable({
    providedIn:'root'
})
export class QuickService{
    constructor(private readonly http:HttpClient){}
    public quickApi:string='https://api-sales-app.josetovar.dev/quick-sales'

    public getQuick(){
        return this.http.get(`${Environment.api}/quick-sales`)
      }
      public getById(quickSaleId:number){
        return this.http.get(`${Environment.api}/quick-sales/${quickSaleId}`)
        }
        public createQuickSale(quick_sale:any){
            return this.http.post(`${Environment.api}/quick-sales`,quick_sale)
          }

          public updateQuick(sale:any){
            return this.http.put(`${Environment.api}/quick-sales`,sale)
          }

          
}