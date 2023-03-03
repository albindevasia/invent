import { HttpClient, HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
// import { ToastrService } from 'ngx-toastr/public_api';
import { TableService } from '../services/table.service';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
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
  constructor(
    private readonly http: HttpClient,
    private readonly toastr: ToastrService,
    private readonly apiService: ApiService
  ) {}

  public url: string = 'https://63be80d8585bedcb36aecdeb.mockapi.io/ecart';
  // public products$:any;

  public updateProductForm: FormGroup = new FormGroup({});
  public products$!: Observable<any>;
  ngOnInit() {
    this.products$ = this.http.get<{
      id: number;
      Name: string;
      Price: number;
      Department: string;
      stock: number;
    }>(this.url);

    this.products$.subscribe((products) => {
      // this.products$=response;
      products.map((product: any) => {
        this.updateProductForm.addControl(
          `${product.id}`,
          new FormGroup({
            Price:new FormControl(formatCurrency(product.Price,'en-US','$')),
            // Price: new FormControl(product.Price, Validators.min(0)),
            stock: new FormControl(product.stock, Validators.min(0)),
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
    const Price = formatCurrency(
      this.getValueFromCurrency(event.target.value),
      'en-US',
      '$'
    );

    this.updateProductForm.controls[product.id.toString()]
      .get('Price')
      ?.setValue(Price);
  }

  public getValueFromCurrency(value: string): number {
    let Price: number;
    if (value.includes('$')) {
      Price = Number(value.substring(1).replaceAll(',', ''));
    } else {
      Price = Number(value.replaceAll(',', ''));
    }

    return Price;
  }

  public setUpdatedValues(product: any): void {
    const updatedValues = {
      ...product,
      ...this.updateProductForm.controls[product.id].value,
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
    const { Price, stock } = this.updateProductForm.controls[product.id].value;

    return Price == product.Price && stock == product.stock;
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

  // editUser(product: any) {
  //   this.editingUser = product;

  // }

  // saveUser() {
  //   this.http.put(`https://63be80d8585bedcb36aecdeb.mockapi.io/ecart/${this.editingUser.id}`, this.editingUser).subscribe(() => {
  //     this.editingUser = null;
  //     this.toastr.success('updated')

  //   });
  // }

  deleteTableRow(id: number): Observable<any> {
    return this.http.delete(
      `https://63be80d8585bedcb36aecdeb.mockapi.io/ecart/${id}`
    );
  }

  deleteRow(id: number) {
    this.deleteTableRow(id).subscribe(() => {
      console.log('Row deleted successfully.');
    });
  }

  onCheckboxChanges(checked: boolean) {
    this.rowDisabled = !checked;
  }

  // showToaster(message:string){
  //     this.toastr.success(`${message}`,'success',{
  //       timeOut:3000,
  //       progressBar:true,
  //       progressAnimation:'decreasing',
  //       positionClass:'toast-bottom-right',
  //       closeButton:true,

  //     })

   }


