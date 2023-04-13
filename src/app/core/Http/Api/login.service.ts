import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn:'root'
})
export class LoginService{
    constructor(private readonly http:HttpClient){}

    public apiUrl:string='https://api-sales-app.josetovar.dev';
    public getAuthr(){
        return this.http.post(`${this.apiUrl}/auth`,null);
        }
}