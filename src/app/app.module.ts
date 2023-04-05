import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// import { DashboardComponent } from './lazy/dashboard/dashboard.component';
import { LoginComponent } from './load/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import {  HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { SimpleProductComponent } from './simple-product/simple-product.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { AuthInterceptor } from './auth/authtoken.interceptor';
import { SaleComponent } from './sale/sale.component';
import { NewSaleComponent } from './new-sale/new-sale.component';
import { OverviewComponent } from './overview/overview.component';
import { QuicksaleComponent } from './quicksale/quicksale.component';
import { SaleTableComponent } from './sale-table/sale-table.component';
import { ViewQuickComponent } from './view-quick/view-quick.component';
import { UseComponent } from './use/use.component';

// import { SearchComponent } from './search/search.component';
// import { SalesComponent } from './sales/sales.component';






@NgModule({
  declarations: [
    AppComponent,
    // DashboardComponent,
    // LoginComponent,
    RegisterComponent,
    HomeComponent,
    SimpleProductComponent,
    // UseComponent,
    // ViewQuickComponent,
    // QuicksaleComponent,
    // SaleTableComponent,
    
   
   
    // SaleComponent,
    // SearchComponent,
    // SalesComponent,
    
   
  
  

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    
   
  
    ToastrModule.forRoot({
       progressBar:true,
        timeOut:3000,
         positionClass:'toast-top-center',
          closeButton:true,
           preventDuplicates:true}),

    
   

  ],

  exports: [
    BrowserModule,
    BrowserAnimationsModule,
    ToastrModule,
 
  ],
  

  providers: [
    {provide :HTTP_INTERCEPTORS,useClass:AuthInterceptor,multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
