import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoadRoutingModule } from './load-routing.module';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    LoginComponent,
  
  ],
  imports: [
    CommonModule,
    LoadRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
  ]
})
export class LoadModule { }
