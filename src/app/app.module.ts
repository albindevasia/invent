import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// import { DashboardComponent } from './lazy/dashboard/dashboard.component';
import { LoginComponent } from './load/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './reg/register/register.component';
import {  HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { SimpleProductComponent } from './modules/dashboard/products/simple-product/simple-product.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { AuthInterceptor } from './core/Interceptors/authtoken.interceptor';
import { SaleComponent } from './modules/dashboard/sales/sale/sale.component';
import { NewSaleComponent } from './modules/dashboard/sales/new-sale/new-sale.component';
import { OverviewComponent } from './modules/dashboard/overview/overview.component';
import { QuicksaleComponent } from './modules/dashboard/sales/quicksale/quicksale.component';
import { SaleTableComponent } from './modules/dashboard/sales/sale-table/sale-table.component';
import { ViewQuickComponent } from './modules/dashboard/sales/view-quick/view-quick.component';
import { NewquickComponent } from './modules/dashboard/sales/newquick/newquick.component';


// import { SearchComponent } from './search/search.component';
// import { SalesComponent } from './sales/sales.component';






@NgModule({
  declarations: [
    AppComponent,
    // DashboardComponent,
    // LoginComponent,
    // RegisterComponent,
    HomeComponent,
    SimpleProductComponent,
    // NewquickComponent,
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
