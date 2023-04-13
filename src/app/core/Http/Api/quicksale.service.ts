import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn:'root'
})
export class QuickService{
    constructor(private readonly http:HttpClient){}
    public quickApi:string='https://api-sales-app.josetovar.dev/quick-sales'

    public getQuick(){
        return this.http.get(`${this.quickApi}`)
      }
      public getById(quickSaleId:number){
        return this.http.get(`${this.quickApi}/${quickSaleId}`)
        }
        public createQuickSale(quick_sale:any){
            return this.http.post(`${this.quickApi}`,quick_sale)
          }
}