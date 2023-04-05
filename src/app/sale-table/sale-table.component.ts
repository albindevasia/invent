import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-sale-table',
  templateUrl: './sale-table.component.html',
  styleUrls: ['./sale-table.component.scss']
})
export class SaleTableComponent {
constructor(
  private readonly apiService:ApiService
){}
  public saleApi: string = 'https://api-sales-app.josetovar.dev/sales';
  public editing = true;
  
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
