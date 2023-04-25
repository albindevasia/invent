import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Environment } from "src/Environment/environment";
interface IClient{
  id: number;
  first_name: string;
  last_name: string;
  address: string;
  city: string;
  state: string;
  country: string;
  phone: number;
  email: string;
}
@Injectable({
    providedIn:'root'
})

export class ClientService{
    constructor(private readonly http:HttpClient){}

    // public clientApi:string='https://api-sales-app.josetovar.dev/clients'
    public addClient() {
        return  this.http.get<IClient>(`${Environment.api}/clients`);
        }

        public updateClient(client:any){
            return this.http.put(`${Environment.api}/clients`,client)
          }
          public clientNew(client:any){
            return this.http.post(`${Environment.api}/clients`,client)
           }

           
}