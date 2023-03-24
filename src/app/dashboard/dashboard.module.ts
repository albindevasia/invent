import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  HttpClientModule } from '@angular/common/http';

import { DashboardComponent } from '../dashboard/dashboard.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { PaginationComponent } from '../pagination/pagination.component';
import { PagePipe } from '../page.pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { ClientsComponent } from '../clients/clients.component';
import { ProductsComponent } from '../products/products.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { SalesComponent } from '../sales/sales.component';





@NgModule({
  declarations: [
    DashboardComponent,
    ClientsComponent,
    ProductsComponent,
    SalesComponent,
    PaginationComponent,
 
    PagePipe
  
   
  ],
  imports: [
  
   
    CommonModule,
   DashboardRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgxPaginationModule
  ],
  // providers: [
  //   {provide :HTTP_INTERCEPTORS,useClass:AuthInterceptor,multi:true}
  // ],
  // bootstrap: [AppComponent]
exports:[
  PagePipe
]

})
export class DashboardModule { }
