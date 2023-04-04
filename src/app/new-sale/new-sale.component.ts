import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
    private readonly fb:FormBuilder,
    private readonly http: HttpClient,
    private apiService: ApiService,
    private readonly toastr: ToastrService,
    private readonly router:Router,
    private readonly activatedRoute:ActivatedRoute
  ) {
    

  }
public orderTotal:number=0;
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
    productSelector: new FormControl(''),
    products: new FormArray([]),
  });

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params)=>{
      
      if(params['quicksale']){
      this.apiService.getById(Number(params['quicksale'])).subscribe(quickSale=>{

    console.log(quickSale)
      })
        
      
      }
   
    })




    this.apiService.addClient();
    this.products$=this.http.get(this.productApi);
  
  } 
  get saleProducts(): FormArray {
    return this.saleForm.controls['products'] as FormArray;
  }



  public addProductTolist(product:any) {
// if(Number(quantity)>product.stock){
//   this.toastr.error('Quantity should be less than stock')
// }
    const newProduct: FormGroup = new FormGroup({
      id: new FormControl(product.id, Validators.required),
      
      
      quantity: new FormControl(1,[
        Validators.required,
        Validators.min(1),
        Validators.max(product.stock)
      ]
       
       
      ),
    stock:new FormControl(product.stock),
      name:new FormControl(product.name),
      price:new FormControl(product.price)
    });
    
    this.saleProducts.push(newProduct);
    this.updateTotal();
    console.log(product.price)
  }

  public increaseQuantity(control: any, formIndex: any): void {
    if (control.value.quantity < control.value.originalStock) {
      this.saleProducts.controls[formIndex].patchValue({
        quantity: control.value.quantity + 1,
      });

    this.updateTotal()
    }
  }

  public decreaseQuantity(control: any, formIndex: any): void {
    if (control.value.quantity > 1) {
      this.saleProducts.controls[formIndex].patchValue({
        quantity: control.value.quantity - 1,
      });

this.updateTotal()
    }
  }


  public removeProduct(productIndex: any): void {
    this.saleProducts.removeAt(productIndex);
  }

  public cancel() {
    this.router.navigateByUrl('/dashboard/sales')
  }

  public confirmSale() {
    console.log(this.saleForm.value);
    this.http.post(`${this.saleApi}`, this.saleForm.value).subscribe({
      next: (res) => {
        console.log(res);
        this.toastr.success('New sale added successfully');
      },
      error: (error) => {
        this.toastr.error('Product Quantity is Out of Range');
      },
      complete: () => {
        console.log('Is good');
      },
    });
    this.saleForm.reset();
    this.searchValue='';
    this.router.navigateByUrl('/dashboard/sales')
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
     this.updateTotal()
  }

  selectClient(clientId: any, value: string) {
    // console.log(clientId);
    this.saleForm.get('client_id')?.setValue(clientId);
    console.log(this.saleForm.value);
    this.searchValue = value;
    this.filteredClients = [];
    this.isClientSelected =false;
this.updateTotal()
  }

searchText:string='';
searchProduct(){
  console.log(this.searchText);
  this.products$
  .pipe(
    (map((products:any)=>{
      return products.filter((product:any)=>
      product.active == true &&

       product.stock>0&&
        product.name.toLowerCase().includes(this.searchText.toLowerCase())    
      
     
    
      )
      
  
    })
  
      )
  ).subscribe((filteredProducts)=>{
this.filteredProducts=filteredProducts
  });
this.updateTotal()
}



selectProduct(productId:any,value:string){
  const product=this.filteredProducts.find((product)=>product.id === productId ) ;

 

  const productIndex = this.saleProducts.length -1;
  const productFormGroup=this.saleProducts.at(productIndex) as FormGroup;
  productFormGroup.controls['id'].setValue(product.id);
  console.log(this.saleForm.value);
  this.searchText = value;
  this.filteredProducts=[];
this.updateTotal()
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

  this.searchValue='';
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
public showCartView = false;
public cancelCart(){
  this.showCartView=false;
}

  productForm!: FormGroup;

 getTotalOrderPrice(){
  let price=0;
  
  for(const product of this.saleProducts.controls)
  price += product.get('price')?.value * product.get('quantity')?.value;
this.updateTotal
  return price
 }
  getTotalOrderQuantity(){
    let total = 0
    for(const product of this.saleProducts.controls)
    total += product.get('quantity')?.value;
    this. updateTotal()
    return total;
  
  }

public updateTotal():void{
  this.orderTotal=this.saleProducts.controls.reduce((acc,val)=>{
    acc=acc + val.value.quantity * val.value.price;
    return acc;
  },0)
}

  clientForward(){
    this.router.navigate(['/dashboard/clients'],{queryParams:{source:'newsale'}})
  }


// public orderTotal: number = 0;

//   public clients!: any[];
//   public clientsList!: any[];

//   public products!: any[];
//   public productsList!: any[];

//   public showClientSelector: boolean = false;
//   public showProductSelector: boolean = false;

//   public newSaleForm: FormGroup = new FormGroup({
//     clientId: new FormControl('', Validators.required),
//     productSelector: new FormControl(''),
//     products: new FormArray([]),
//   });

//   ngOnInit(): void {
//     this.activatedRoute.queryParams.subscribe((query) => {
//       if (query['quicksale']) {
//         this.addOrderProduct({
//           name: 'JBL',
//           price: 4009000,
//           stock: 991,
//           created_at: '2023-03-15T02:45:17.328054+00:00',
//           sku: '5458',
//           id: 188,
//           active: true,
//           updated_at: '2023-03-30T02:41:08.100777+00:00',
//         });
//       }
//     });

//     this.apiService
//       .addClient()
//       .subscribe((clients: any) => (this.clients = clients));

//     this.apiService
//       .getProducts()
//       .subscribe(
//         (products: any) =>
//           (this.products = products.filter(
//             (e: { stock: number; active: boolean; }) => e.stock >= 1 && e.active == true
//           ))
//       );

//     this.newSaleForm.valueChanges.subscribe((values) => {
//       if (values.clientId) {
//         this.filterClients(values.clientId);
//       } else {
//         this.filterClients();
//       }

//       if (values.productSelector) {
//         this.filterProducts(values.productSelector);
//       } else {
//         this.filterProducts();
//       }

//       this.updateOrderTotal();
//     });
//   }

//   public filterClients(criteria?: string): void {
//     if (criteria) {
//       this.clientsList = this.clients.filter((client) =>
//         client.email.includes(criteria)
//       );
//     } else {
//       this.clientsList = [];
//     }
//   }

//   public filterProducts(criteria?: string): void {
//     if (criteria) {
//       this.productsList = this.products.filter((product) =>
//         product.name.includes(criteria)
//       );
//     } else {
//       this.productsList = [];
//     }
//   }

//   public toggleClientSelector(): void {
//     this.showClientSelector = !this.showClientSelector;
//   }

//   public toggleProductSelector(): void {
//     this.showProductSelector = !this.showProductSelector;
//   }

//   get saleProducts(): FormArray {
//     return this.newSaleForm.controls['products'] as FormArray;
//   }

//   public addOrderProduct(product: any): void {
//     const newProduct: FormGroup = new FormGroup({
//       productId: new FormControl(product.id, Validators.required),
//       quantity: new FormControl(1, [
//         Validators.required,
//         Validators.min(1),
//         Validators.max(product.stock),
//       ]),
//       originalStock: new FormControl(product.stock),
//       originalName: new FormControl(product.name),
//       originalPrice: new FormControl(product.price),
//     });

//     this.saleProducts.push(newProduct);

//     this.updateOrderTotal();
//   }

//   public increaseQuantity(control: any, formIndex: any): void {
//     if (control.value.quantity < control.value.originalStock) {
//       this.saleProducts.controls[formIndex].patchValue({
//         quantity: control.value.quantity + 1,
//       });

//       this.updateOrderTotal();
//     }
//   }

//   public decreaseQuantity(control: any, formIndex: any): void {
//     if (control.value.quantity > 1) {
//       this.saleProducts.controls[formIndex].patchValue({
//         quantity: control.value.quantity - 1,
//       });

//       this.updateOrderTotal();
//     }
//   }

//   public deleteSaleProduct(formIndex: number): void {
//     this.saleProducts.removeAt(formIndex);

//     this.updateOrderTotal();
//   }

//   public updateOrderTotal(): void {
//     this.orderTotal = this.saleProducts.controls.reduce((acc, val) => {
//       acc = acc + val.value.quantity * val.value.originalPrice;
//       return acc;
//     }, 0);
//   }



}


