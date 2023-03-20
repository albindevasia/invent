import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnChanges, SimpleChanges } from '@angular/core';
// import { ToastrService } from 'ngx-toastr/public_api';

import { ToastrService } from 'ngx-toastr';
import { map, Observable, of } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { formatCurrency } from '@angular/common';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {
  rowDisabled: boolean = true;
  // editingUser: any;
  totalItems!: number;
  productEnabledControls: { [id: number]: FormControl } = {};
  products: any;
  updatingUser: any;
  selectedStatus: any;
  selectedStock: any;
  constructor(
    private readonly http: HttpClient,
    private readonly toastr: ToastrService,
    private readonly apiService: ApiService
  ) {}

  public url: string = 'https://api-sales-app.josetovar.dev/products';
  // public products$:any;

  public updateProductForm: FormGroup = new FormGroup({});
  public products$!: Observable<any>;
  ngOnInit() {
    this.products$ = this.http.get<{
      id: number;
      name: string;
      price: number;
      sku: string;
      stock: number;
    }>(this.url);

    this.products$.subscribe((products: any[]) => {
      // this.products$=response;
      this.totalItems = products.length;
      products.map((product: any) => {
        this.updateProductForm.addControl(
          `${product.id}`,
          new FormGroup({
            price: new FormControl(formatCurrency(product.price, 'en-US', '$')),
            // price: new FormControl(product.price, Validators.min(0)),
            stock: new FormControl(product.stock, Validators.min(0)),
            switch: new FormControl(product.active),
          })
        );
      });
    });
  }

  public setFormatCurrency(product: any, event: any): void {
    const price = formatCurrency(
      this.getValueFromCurrency(event.target.value),
      'en-US',
      '$'
    );

    this.updateProductForm.controls[product.id.toString()]
      .get('price')
      ?.setValue(price);
  }

  public getValueFromCurrency(value: string): number {
    let price: number;
    if (value.includes('$')) {
      price = Number(value.substring(1).replaceAll(',', ''));
    } else {
      price = Number(value.replaceAll(',', ''));
    }

    return price;
  }

  public setUpdatedValues(product: any): void {
    const { price } = this.updateProductForm.controls[product.id].value;
    const updatedValues = {
      ...product,
      ...this.updateProductForm.controls[product.id].value,
      price: +price.substring(1).replaceAll(',', '').replaceAll('.', ''),
    };
    console.log(updatedValues);

    this.apiService.updateSingeProduct(updatedValues).subscribe((response: any) => {
      console.log(response);

      this.toastr.success('updated');
    });
  }

  public setDisableValue(product: any): boolean {
    const { price, stock } = this.updateProductForm.controls[product.id].value;

    return price == product.price && stock == product.stock;
  }

  public updateProductStatus(product: any, event: any) {
    const status = event.target.checked;
    if (event.target.checked == true) {
      this.updateProductForm.controls[product.id].get('price')?.enable();
      this.updateProductForm.controls[product.id].get('stock')?.enable();

      this.http
        .put(
          `https://api-sales-app.josetovar.dev/product-status/${product.id}?status=${status}`,
          {}
        )
        .subscribe({
          next: (response) => {
            if (response) {
              this.toastr.success(
                `Product with ID:${product.id} has been activated`
              );
            }
          },
          error: (error) => {
            this.toastr.error(`Product with ID: ${product.id} does not exist.`);
          },
          complete: () => {
            console.log('Is good');
          },
        });
    } else {
      this.updateProductForm.controls[product.id].get('price')?.disable();
      this.updateProductForm.controls[product.id].get('stock')?.disable();

      this.http
        .put(
          `https://api-sales-app.josetovar.dev/product-status/${product.id}?status=${status}`,
          {}
        )
        .subscribe({
          next: (response) => {
            if (response) {
              this.toastr.success(
                `Product with ID:${product.id} has been activated`
              );
            }
          },
          error: (error) => {
            this.toastr.error(`Product with ID: ${product.id} does not exist.`);
          },
          complete: () => {
            console.log('Is good');
          },
        });
    }
  }

  public deleteProduct(product: any) {
    this.http
      .delete(`https://api-sales-app.josetovar.dev/products/${product.id}`)
      .subscribe({
        next: (response) => {
          this.http
            .get(`https://api-sales-app.josetovar.dev/products`)
            .subscribe((response) => {
              this.products$ = of(response);
            });
          if (response) {
            this.toastr.success(
              `Product with ID:${product.id} has been deleted successfully.`
            );
          }
        },
        error: (error) => {
          this.toastr.error(`Product with ID: ${product.id}`);
        },
        complete: () => {
          console.log('Is good');
        },
      });
  }

  public setFilters(activeEvent: any): void {
    this.currentPage = 1;
    this.products$ = this.http.get<any>(this.url).pipe(
      map((products: any) => {
        this.totalItems = products.length;
        if (activeEvent.target.value) {
          return products.filter(
            (product: any) =>
              product.active.toString() === activeEvent.target.value
          );
        } else {
          return products;
        }
      })
    );
  }

  public setStock(activeEvent: any): void {
    this.currentPage = 1;
    this.products$ = this.http.get<any>(this.url).pipe(
      map((products: any) => {
        this.totalItems = products.length;
        if (activeEvent.target.value)
          if (activeEvent.target.value === '0') {
            return products.filter((product: any) => product.stock == 0);
          } else {
            return products.filter((product: any) => product.stock >= 1);
          }
        else {
          return products;
        }
      })
    );
  }

  //   filterData(){
  //     const active=this.selectedStatus;
  //     const stock=this.selectedStock;

  //     return this.products.filter((product:any)=>{
  // if(active === ""){
  //   return true;

  // }else if(product.active.toString()===active){
  //   if(stock === ""){
  //     return true;
  //   }else if (product.stock === stock){
  //     return true;
  //   }

  // }
  // return false;
  //     })
  //   }

  // stockFilters:string[] = ["All", "0", "1"];
  // activeStatusFilters:string[] = ["All", "true", "false"];

  // selectedStockFilter:string = "All";
  // selectedActiveStatusFilter:string = "All";

  public newForm = new FormGroup({
    name: new FormControl(),
    price: new FormControl(),
    sku: new FormControl(),
    stock: new FormControl(),
    active: new FormControl(false),
  });

  public updateNew() {
    this.apiService.createNew(this.newForm.value).subscribe((response) => {
      if (response) {
        console.log(this.newForm.value);
        this.http
          .get(`https://api-sales-app.josetovar.dev/products`)
          .subscribe((response) => {
            this.products$ = of(response);
            this.toastr.success('New product created');
          });
      }
    });
  }

  items!: any[];

  currentPage: number = 1;
  pageSize: number = 5;

  totalPages!: number;

  onPageChanged(pageNumber: number) {
    this.currentPage = pageNumber;
  }
}

