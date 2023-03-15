import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  HttpClientModule } from '@angular/common/http';
import { LazyRoutingModule } from './lazy-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { PaginationComponent } from '../pagination/pagination.component';
import { PagePipe } from '../page.pipe';




@NgModule({
  declarations: [
    DashboardComponent,
    PaginationComponent,
    PagePipe
   
  ],
  imports: [
  
   
    CommonModule,
    LazyRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  // providers: [
  //   {provide :HTTP_INTERCEPTORS,useClass:AuthInterceptor,multi:true}
  // ],
  // bootstrap: [AppComponent]
exports:[
  PagePipe
]

})
export class LazyModule { }
