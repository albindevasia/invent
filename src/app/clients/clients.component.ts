import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AnonymousSubject } from 'rxjs/internal/Subject';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit{

  constructor(
    private readonly http: HttpClient,
    private readonly apiService:ApiService
   
  ) {}
public url:string='https://api-sales-app.josetovar.dev/clients';
public updateProductForm: FormGroup = new FormGroup({});
public clients$!:Observable<any>;
totalItems!:number
ngOnInit(){
  this.clients$=this.http.get<{
   id:number;
   first_name:string;
   last_name:string;
   address:string;
   city:string;
   state:string;
   country:string;
   phone:number;
   email:string
   

  }>(this.url)
  
this.clients$.subscribe((clients:any)=>{
   this.totalItems=clients.length;
  // console.log(client)
  clients.map((client:any)=>{
    this.updateProductForm.addControl(
      `${client.id}`,
      new FormGroup({
        first_name:new FormControl(client.first_name,Validators.required),
        last_name:new FormControl(client.last_name,Validators.required),
        address:new FormControl(client.address,Validators.required),
        city:new FormControl(client.city,Validators.required),
        state:new FormControl(client.state,Validators.required),
        country:new FormControl(client.first_name,Validators.required),
        phone:new FormControl(client.phone,Validators.required),
        email:new FormControl(client.email,Validators.required),
      })
    )
  })
})
 
}

public updateChange(client:any):void{
  const {first_name}=this.updateProductForm.controls[client.id].value;
  const updatedValue={
    ...client,
    ...this.updateProductForm.controls[client.id].value

  };
  this.apiService.updateClient(updatedValue).subscribe((res:any)=>{
    console.log(res)
  })
}
items!: any[];

currentPage: number=1;
pageSize: number = 5;

totalPages!: number;

onPageCh(pageNumber: number) {
  this.currentPage = pageNumber;
 
}

}
