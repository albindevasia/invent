import { HttpClient, HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
// import { ToastrService } from 'ngx-toastr/public_api';
import { TableService } from '../services/table.service';
import { ToastrService } from 'ngx-toastr';
import { Observable, of } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { formatCurrency } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  rowDisabled: boolean = true;
  // editingUser: any;

  productEnabledControls: { [id: number]: FormControl } = {};
  products: any;
  updatingUser: any;
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

    this.products$.subscribe((products) => {
      // this.products$=response;
      products.map((product: any) => {
        this.updateProductForm.addControl(
          `${product.id}`,
          new FormGroup({
            price:new FormControl(formatCurrency(product.price,'en-US','$')),
            // price: new FormControl(product.price, Validators.min(0)),
            stock: new FormControl(product.stock, Validators.min(0)),
            switch:new FormControl(product.active)
          })
        );
      });

      // for(const product of this.products){
      //   this.productEnabledControls[product.id]=new FormControl(product.isEnabled);
      //   this.productEnabledControls[product.id].valueChanges.subscribe((value)=>{
      //     product.isEnabled=value;

      //     console.log(value)
      //   })

      // }
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
    const {price}=this.updateProductForm.controls[product.id].value;
    const updatedValues = {
      ...product,
      ...this.updateProductForm.controls[product.id].value,
      price:+price.substring(1).replaceAll(',','').replaceAll('.','')
    };
    console.log(updatedValues);

    this.apiService
      .updateSingeProduct(updatedValues)
      .subscribe((response) => {
        console.log(response);


        this.toastr.success('updated');
      });
  }

  public setDisableValue(product: any): boolean {
    const { price, stock } = this.updateProductForm.controls[product.id].value;

    return price == product.price && stock == product.stock;
  }


  public updateProductStatus(product:any,event:any){
    const status=event.target.checked;
    if(event.target.checked==true){
      this.updateProductForm.controls[product.id].get('price')?.enable();
      this.updateProductForm.controls[product.id].get('stock')?.enable();

      this.http.put(
        `https://api-sales-app.josetovar.dev/product-status/${product.id}?status=${status}`,{}
  
      )
      .subscribe({
        next:(response)=>{
          if(response){
            this.toastr.success(
              `Product with ID:${product.id} has been activated`
            )
          }
        },
        error: (error) => {
          this.toastr.error(`Product with ID: ${product.id} does not exist.`);
        },
        complete: () => {
          console.log('Is good');
        },
      })

    }else{
      this.updateProductForm.controls[product.id].get('price')?.disable();
      this.updateProductForm.controls[product.id].get('stock')?.disable();

      this.http.put(
        `https://api-sales-app.josetovar.dev/product-status/${product.id}?status=${status}`,{}
  
      )
      .subscribe({
        next:(response)=>{
          if(response){
            this.toastr.success(
              `Product with ID:${product.id} has been activated`
            )
          }
        },
        error: (error) => {
          this.toastr.error(`Product with ID: ${product.id} does not exist.`);
        },
        complete: () => {
          console.log('Is good');
        },
      })
    }

    
  }
   

  public deleteProduct(product:any){
    this.http.delete(`https://api-sales-app.josetovar.dev/products/${product.id}`)
    .subscribe({
      next:(response)=>{

        this.http.get(`https://api-sales-app.josetovar.dev/products`).subscribe(response=>{
          this.products$=of(response);
        })
        if(response){
          this.toastr.success(
            `Product with ID:${product.id} has been deleted successfully.`
          )
        }
      },
      error:(error)=>{
        this.toastr.error(`Product with ID: ${product.id}`)
      },
      complete:()=>{
        console.log('Is good')
      }

    
    })
  }

  



  // isProductDisabled(product:any):boolean{
  //   return !product.isEnabled;
  // }

  // // product:any;
  //  editing!: false;

  // edit(product:any){
  //   this.product=product;
  //   // this.editing=false

  // }
  // submit(){
  //   this.tableService.updateData(this.product).subscribe((response: any)=>{

  //     console.log(response)

  //     this.editing=false
  //     this.showToaster('update success');

  //   })

  // }
  // cancel(){
  //   this.editing=false

  // }
  // showToaster(message:string){
  //   this.toastr.success(`${message}`,'success',{
  //     timeOut:3000,
  //     progressBar:true,
  //     progressAnimation:'decreasing',
  //     positionClass:'toast-bottom-right',
  //     closeButton:true,

  //   })

  //  editUser(products$: any) {
  //    this.updatingUser = products$;

  //  }

  //  saveUser() {
  //    this.http.post(`https://api-sales-app.josetovar.dev/products/`, this.updatingUser).subscribe(() => {
  //      this.updatingUser = null;
  //      this.toastr.success('updated')

  //  });
  //  }

  // deleteTableRow(id: number): Observable<any> {
  //   return this.http.delete(
  //     `https://63be80d8585bedcb36aecdeb.mockapi.io/ecart/${id}`
  //   );
  // }

  // deleteRow(id: number) {
  //   this.deleteTableRow(id).subscribe(() => {
  //     console.log('Row deleted successfully.');
  //   });
  // }

  // onCheckboxChanges(checked: boolean) {
  //   this.rowDisabled = !checked;
  // }

  // showToaster(message:string){
  //     this.toastr.success(`${message}`,'success',{
  //       timeOut:3000,
  //       progressBar:true,
  //       progressAnimation:'decreasing',
  //       positionClass:'toast-bottom-right',
  //       closeButton:true,

  //     })

public  newForm=new FormGroup({
 
    name:new FormControl(),
    price:new FormControl(),
    sku:new FormControl(),
    stock:new FormControl()

  })
   
  public updateNew(){
    this.apiService.createNew(this.newForm.value).subscribe((response)=>{
      console.log(response);

      this.http.get(`https://api-sales-app.josetovar.dev/products`).subscribe((response)=>{
          this.products$=of(response);
        })
     
  })

  }

}
