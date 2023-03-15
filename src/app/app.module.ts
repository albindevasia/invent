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






@NgModule({
  declarations: [
    AppComponent,
    // DashboardComponent,
    // LoginComponent,
    RegisterComponent,
    HomeComponent,
    SimpleProductComponent,
    
   
  
  

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
