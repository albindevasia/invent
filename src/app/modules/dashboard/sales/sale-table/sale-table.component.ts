import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../../services/api.service';
import { Observable } from 'rxjs';
import { SalesService } from '../../../../core/Http/Api/sales.service';

@Component({
  selector: 'app-sale-table',
  templateUrl: './sale-table.component.html',

})
export class SaleTableComponent {
constructor(
  private readonly salesService:SalesService
){}
 
  public editing = true;
  
  public sales$!: Observable<any>;
  totalItems!:number;
  ngOnInit(): void {
    this.salesGet();
  
  }

  public salesGet() {
    this.sales$ = this.salesService.getSales();
    this.sales$.subscribe((sales) => {
     
      this.totalItems=sales.length;
      
    });
  }
  items!: any[];
  currentPage: number=1;
  pageSize: number = 5;
  
  // totalPages!: number;
  
public  onSalePage(pageNumber: number) {
    this.currentPage = pageNumber;
   
  }
  
}
