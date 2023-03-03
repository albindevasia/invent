import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn:'root'
})

export class ApiService{
    constructor(private readonly http:HttpClient){}

    public apiUrl:string='https://63be80d8585bedcb36aecdeb.mockapi.io';
    public getSingle(productId:number):any{
        return this.http.get(`${this.apiUrl}/ecart/${productId}`);
    }

    public updateSingeProduct(product: any) {
        return this.http.put(`https://63be80d8585bedcb36aecdeb.mockapi.io/ecart`, product)
         
      }

}