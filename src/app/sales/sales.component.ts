import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

import { map, Observable, of} from 'rxjs';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss'],
})
export class SalesComponent implements OnInit {
  constructor(
    private readonly apiService: ApiService,
    private readonly http: HttpClient,

  ) {}
  public saleApi: string = 'https://api-sales-app.josetovar.dev/sales';
  
  public sales$!: Observable<any>;
  totalItems!:number;
  ngOnInit(): void {
    this.salesGet();
  }

  public salesGet() {
    this.sales$ = this.apiService.getSales();
    this.sales$.subscribe((sales) => {
      console.log(sales);
      this.totalItems=sales.length;
      console.log(sales.length)
    });
  }
  items!: any[];
  currentPage: number=1;
  pageSize: number = 5;
  
  // totalPages!: number;
  
  onSalePage(pageNumber: number) {
    this.currentPage = pageNumber;
   
  }
}