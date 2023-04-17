import { Component } from '@angular/core';
import { ApiService } from '../../../../services/api.service';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { QuickService } from '@apiquicksale.service';
import { ProductService } from '@apiproducts.service';


@Component({
  selector: 'app-quicksale',
  templateUrl: './quicksale.component.html',

})
export class QuicksaleComponent {
  quickSale$!:Observable<any>;

  constructor(
    private readonly toastr: ToastrService,
    private readonly http: HttpClient,
    private readonly quickService:QuickService,
    private readonly productService:ProductService,
    private readonly router:Router
  ){

  }
  // public productApi: string = 'https://api-sales-app.josetovar.dev/products';
  // public quickApi: string = 'https://api-sales-app.josetovar.dev/quick-sales';
  public filteredProducts: any[] = [];
  public products$!: Observable<any>;
  ngOnInit(){
   this.getQuickSale();
   this.products$=this.productService.getProducts();
    }

    getQuickSale(){
      this.quickSale$=this.quickService.getQuick();
      this.quickSale$.subscribe((sales:any)=>{
        this.totalItems=sales.length;
        console.log(  this.totalItems)
      })
    }

    getNavigate(id:number){
      this.router.navigate(['dashboard/sales/newsale'],{queryParams:{quick_sale:id}})
    
    }

  items!: any[];
  totalItems!:number
currentPage: number=1;
pageSize: number = 5;

totalPages!: number;

onPageCh(pageNumber: number) {
  this.currentPage = pageNumber;
 
}
}