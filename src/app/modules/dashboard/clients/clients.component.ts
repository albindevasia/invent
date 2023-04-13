import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { Observable, of, Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service'; 
import { ToastrService } from 'ngx-toastr';
import { SubjectService } from 'src/app/Authentification/sub.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from 'src/app/core/Http/Api/clients.service'; 
import { IClient } from 'src/app/shared/interface';


@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
 
})
export class ClientsComponent implements OnInit{

  constructor(
    private readonly http: HttpClient,
    private readonly clientService:ClientService,
    private readonly toastr:ToastrService,
    private readonly route:ActivatedRoute,
    private readonly router:Router,
   @Inject(SubjectService) private readonly subService:SubjectService

   
  ) {}
public url:string='https://api-sales-app.josetovar.dev/clients';
public updateProductForm: FormGroup = new FormGroup({});
public clients$!:Observable<any>;
public clickEventSubscription:Subscription=this.subService.getClickEvent().subscribe(()=>{
  this.getClient();
})
totalItems!:number
ngOnInit(): void{
this.getClient();
this.route.queryParams.subscribe((params:{[source:string]:string})=>{
  if(params['source']){
    this.creating=true;
  }
})

}
public getClient(){
  this.clients$=this.http.get<IClient>(this.url)
   
 this.clients$.subscribe((clients:any)=>{
    this.totalItems=clients.length;

 
 })
}

client:any;
editing=false;
public edit(client:any){
  this.client=client;
  this.editing=true;
}

 public submit(){
  this.clientService.updateClient(this.client).subscribe((res)=>{
    if (res) {
      this.toastr.success(
        `Client with ID:${this.client.id} has been Edited successfully.`
    
      );
      // this.ngOnInit()
   
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
      this.subService.sendClickEvent();
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
if(this.clientForm.valid){
  this.clientService.clientNew(this.clientForm.value).subscribe((res)=>{
 
      console.log(this.clientForm.value);

       this.subService.sendClickEvent();
        this.creating=false;
        this.toastr.success(`New Client  created`);


    
   });
   this.route.queryParams.subscribe((params:{[source:string]:string})=>{
    if(params['source'])
    this.router.navigate(['/dashboard/newsale']),{queryParams:{source:'clients'}}
   })

  }

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

searchValue='';
clients:any[]=[]
onSearch(event:any){
  

  return this.clients.filter((client)=>{

const searchValueLowercase=this.searchValue.toLowerCase();
// console.log(this.searchValue)

return client.first_name.toLowerCase().includes(searchValueLowercase)||
 client.last_name.toLowerCase().includes(searchValueLowercase)||
 client.address.toLowerCase().includes(searchValueLowercase)||
client.city.toLowerCase().includes(searchValueLowercase)||
client.state.toLowerCase().includes(searchValueLowercase)||
client.country.toLowerCase().includes(searchValueLowercase)||
client.phone.toString().includes(searchValueLowercase)
||
client.email.toLowerCase().includes(searchValueLowercase);

    
  });
  

}
}
