import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit{

  constructor(
    private readonly http: HttpClient,
    private readonly apiService:ApiService,
    private readonly toastr:ToastrService
   
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
   console.log(clients.length)

})

}

client:any;
editing=false;
public edit(client:any){
  this.client=client;
  this.editing=true;
}

 public submit(){
  this.apiService.updateClient(this.client).subscribe((res)=>{
    if (res) {
      this.toastr.success(
        `Client with ID:${this.client.id} has been Edited successfully.`
    
      );
      // this.ngOnInit()
      console.log(res)
    }
    this.editing=false;

  })
}
public cancel(){
  this.toastr.info(`Client with ID:${this.client.id} has not been updated.`)
  this.editing=false;
}
public deleteClient(client: any) {
  this.http
    .delete(`https://api-sales-app.josetovar.dev/clients/${client.id}`)
    .subscribe({
      next: (response) => {
      this.ngOnInit();
        if (response) {
          this.toastr.success(
            `Client with ID:${client.id} has been deleted successfully.`
          );
        }
      },
      error: (error) => {
        this.toastr.error(`Client with ID: ${client.id}`);
      },
      complete: () => {
        console.log('Is good');
      },
    });
}
creating=false;

public add(){

  this.creating=true;
}
public clientForm=new FormGroup({
  first_name:new FormControl('',Validators.required),
  last_name:new FormControl('',Validators.required),
  address:new FormControl('',Validators.required),
  city:new FormControl('',Validators.required),
  state:new FormControl('',Validators.required),
  country:new FormControl('',Validators.required),
  email:new FormControl('',Validators.required),
  phone:new FormControl('',Validators.required)
})

public newClient(){

  this.apiService.clientNew(this.clientForm.value).subscribe((res)=>{
    if(res){
      console.log(this.clientForm.value);

       this.ngOnInit();
        this.creating=false;
        this.toastr.success(`New Client  created`);


    }
   })


}
cancelCreation(){
  this.creating=false;
  this.toastr.info('New Client is not created')
}
items!: any[];

currentPage: number=1;
pageSize: number = 5;

totalPages!: number;

onPageCh(pageNumber: number) {
  this.currentPage = pageNumber;
 
}

}
