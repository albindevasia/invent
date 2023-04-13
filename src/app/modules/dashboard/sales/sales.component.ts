import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { map, Observable, of} from 'rxjs';
import { NewSaleComponent } from './new-sale/new-sale.component';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
 
})
export class SalesComponent  {
  constructor(
    private readonly apiService: ApiService,
    private readonly http: HttpClient,
    private readonly route:ActivatedRoute

  ) {}
 
}