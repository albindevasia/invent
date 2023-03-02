import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn:'root'
})

export class TableService{
 private apiUrl='https://63be80d8585bedcb36aecdeb.mockapi.io'
 constructor(private http:HttpClient){}

 updateData(products$:any):any{
return this.http.put(`${this.apiUrl}/ecart/`,products$);
 }
}

