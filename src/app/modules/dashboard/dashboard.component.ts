import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnChanges, SimpleChanges } from '@angular/core';
// import { ToastrService } from 'ngx-toastr/public_api';

import { ToastrService } from 'ngx-toastr';
import { map, Observable, of } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { formatCurrency } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',

})
export class DashboardComponent {
  constructor(private readonly router:Router){}
  public logOut(){

    const logOt = localStorage.getItem('access_token');
  
   
    if (logOt) {
      localStorage.removeItem('access_token');
    }
  
    this.router.navigate(['../load/login'])
  
  
  
  
  }
}
