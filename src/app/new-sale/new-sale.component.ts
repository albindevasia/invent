import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { map, Observable } from 'rxjs';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-new-sale',
  templateUrl: './new-sale.component.html',
  styleUrls: ['./new-sale.component.scss'],
})
export class NewSaleComponent implements OnInit {
  newSale: any;

  constructor(
    private readonly http: HttpClient,
    private apiService: ApiService,
    private readonly toastr: ToastrService
  ) {}
  isClientSelected: boolean = false;
  public selectedClientId!: number;
  public clients$!: Observable<any>;
  public products$!: Observable<any>;
  public filteredClients: any[] = [];
  public filteredProducts: any[] = [];
  public url: string = 'https://api-sales-app.josetovar.dev/clients';
  public saleApi: string = 'https://api-sales-app.josetovar.dev/sales';
  public productApi: string = 'https://api-sales-app.josetovar.dev/products';
  public saleForm: FormGroup = new FormGroup({
    client_id: new FormControl('', Validators.required),
    products: new FormArray([]),
  });
  get saleProducts(): FormArray {
    return this.saleForm.controls['products'] as FormArray;
  }

  public addProductTolist(): void {
    const newProduct: FormGroup = new FormGroup({
      id: new FormControl(null, Validators.required),
      quantity: new FormControl(null, Validators.required),
    });
    
    this.saleProducts.push(newProduct);
  }
  public removeProduct(productIndex: any): void {
    this.saleProducts.removeAt(productIndex);
  }
  editing = false;
  public cancel() {
    this.editing = false;
  }
  public addSale() {
    this.editing = true;
  }
  public confirmSale() {
    console.log(this.saleForm.value);
    this.http.post(`${this.saleApi}`, this.saleForm.value).subscribe({
      next: (res) => {
        console.log(res);
        this.toastr.success('New sale added successfully');
      },
      error: (error) => {
        this.toastr.error('Product Id is not found');
      },
      complete: () => {
        console.log('Is good');
      },
    });
    this.saleForm.reset();
    this.editing = false;
  }
  ngOnInit() {
    this.apiService.addClient();
    this.products$=this.http.get(this.productApi);
  }

  // public getClient(){

  searchValue: string = '';

  searchName() {
    console.log(this.searchValue);
    this.apiService
      .addClient()
      .pipe(
        map((client: any) => {
          return client.filter((client: any) =>
            client.first_name
              .toLowerCase()
              .includes(this.searchValue.toLowerCase())
          );
        })
      )
      .subscribe((filteredClients) => {
        console.log(filteredClients);
        this.filteredClients = filteredClients;
      });
  }

  selectClient(clientId: any, value: string) {
    // console.log(clientId);
    this.saleForm.get('client_id')?.setValue(clientId);
    console.log(this.saleForm.value);
    this.searchValue = value;
    this.filteredClients = [];
    this.isClientSelected = false;
  }

searchText:string='';
searchProduct(){
  console.log(this.searchText);
  this.products$
  .pipe(
    (map((products:any)=>{
      return products.filter((product:any)=>
      product.name.toLowerCase().includes(this.searchText.toLowerCase())
      )
    })
      )
  ).subscribe((filteredProducts)=>{
this.filteredProducts=filteredProducts
  });
}

selectProduct(productId:any,value:string){
  const product=this.filteredProducts.find((product)=>product.id === productId ) ;

 

  const productIndex = this.saleProducts.length -1;
  const productFormGroup=this.saleProducts.at(productIndex) as FormGroup;
  productFormGroup.controls['id'].setValue(product.id);
  console.log(this.saleForm.value);
  this.searchText = value;
  this.filteredProducts=[];

}


public cartItems:any[]=[]

public addTocart(){
  this.cartView=true;
  const saleFormValue=this.saleForm.value;
  saleFormValue.products=saleFormValue.products.map((product:any)=>({
    id: product.id,
    quantity: product.quantity
  }));
  this.cartItems.push(saleFormValue);
  console.log(saleFormValue);
  this.saleForm.reset();
  this.saleForm.get('client_id')?.setValue('');
  this.isClientSelected = false;
}

public removeFromCart(index: number) {
  this.cartItems.splice(index, 1);
}
cartView=false;
public addCartItemToSales(cartItem: any) {

  this.http.post(`${this.saleApi}`, cartItem).subscribe({
  
    next: (res) => {
      console.log(res);
      this.toastr.success('Sale added successfully');
      this.cartItems.splice(this.cartItems.indexOf(cartItem), 1);
    },
    error: (error) => {
      this.toastr.error('Error adding sale');
    }
  });
}
public cartClose(){
  this.cartView=false;
}
}