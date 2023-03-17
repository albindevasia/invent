import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnChanges, SimpleChanges } from '@angular/core';
// import { ToastrService } from 'ngx-toastr/public_api';
import { TableService } from '../services/table.service';
import { ToastrService } from 'ngx-toastr';
import { map, Observable, of } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { formatCurrency } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  
}
