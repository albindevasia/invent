import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map, Observable } from 'rxjs';
import { ApiService } from '../../../../services/api.service';
import { DataStorageService } from '../../../../Authentification/data.service';
import { SalesService } from '../../../../core/Http/Api/sales.service';
import { QuickService } from '../../../../core/Http/Api/quicksale.service';
import { ProductService } from '../../../../core/Http/Api/products.service';
import { ClientService } from '../../../../core/Http/Api/clients.service';

@Component({
  selector: 'app-new-sale',
  templateUrl: './new-sale.component.html',

})
export class NewSaleComponent implements OnInit {
//   newSale: any;

//   constructor(
//     private readonly fb:FormBuilder,
//     private readonly http: HttpClient,
//     private apiService: ApiService,
//     private readonly toastr: ToastrService,
//     private readonly router:Router,
//     private readonly activatedRoute:ActivatedRoute
//   ) {
    

//   }
//  public orderTotal:number=0;
//   isClientSelected: boolean = false;
//   public selectedClientId!: number;
//   public clients$!: Observable<any>;
//   public products$!: Observable<any>;
//   public filteredClients: any[] = [];
//   public filteredProducts: any[] = [];
//   public url: string = 'https://api-sales-app.josetovar.dev/clients';
//   public saleApi: string = 'https://api-sales-app.josetovar.dev/sales';
//   public productApi: string = 'https://api-sales-app.josetovar.dev/products';


//   ngOnInit() {
//     this.activatedRoute.queryParams.subscribe((params:{[source:string]:string})=>{ this.onQuickSale(params)})




//     this.apiService.addClient();
//     this.products$=this.http.get(this.productApi);
  
//   } 

//   onQuickSale(params:{[source:string]:string}){
//     if(params['quick_sale']){
//       // this.salesForm.reset();
//       // this.selectedClient='';
//       // this.selectedProducts.clear();
//       // console.log(this.salesForm.value)
//       this.apiService.getById(Number(params['quick_sale'])).subscribe((quickSale:any)=>{
//                                                                   for(let product of quickSale.products){
//                                                                         this.addProductTolist(product)
//                                                                         console.log(product)}
//                                                                   console.log(this.saleForm.value)

//                                                                   })
//   }

//   }
 
  
//   public saleForm: FormGroup = new FormGroup({
//     client_id: new FormControl('', Validators.required),
   
//     products: new FormArray([]),
//   });

//   get saleProducts(): FormArray {
//     return this.saleForm.controls['products'] as FormArray;
//   }



//   public addProductTolist(product:any) {
// // if(Number(quantity)>product.stock){
// //   this.toastr.error('Quantity should be less than stock')
// // }
//     const newProduct: FormGroup = new FormGroup({
//       id: new FormControl(product.id, Validators.required),
      
      
//       quantity: new FormControl(1,[
//         Validators.required,
//         Validators.min(1),
//         Validators.max(product.stock)
//       ]
       
       
//       ),
//     stock:new FormControl(product.stock),
//       name:new FormControl(product.name),
//       price:new FormControl(product.price)
//     });
    
//     this.saleProducts.push(newProduct);
//     this.updateTotal();
//     console.log(product.price)
//   }

//   public increaseQuantity(control: any, formIndex: any): void {
//     if (control.value.quantity < control.value.originalStock) {
//       this.saleProducts.controls[formIndex].patchValue({
//         quantity: control.value.quantity + 1,
//       });

//     this.updateTotal()
//     }
//   }

//   public decreaseQuantity(control: any, formIndex: any): void {
//     if (control.value.quantity > 1) {
//       this.saleProducts.controls[formIndex].patchValue({
//         quantity: control.value.quantity - 1,
//       });

// this.updateTotal()
//     }
//   }


//   public removeProduct(productIndex: any): void {
//     this.saleProducts.removeAt(productIndex);
//   }

//   public cancel() {
//     this.router.navigateByUrl('/dashboard/sales')
//   }

//   public confirmSale() {
//     console.log(this.saleForm.value);
//     this.http.post(`${this.saleApi}`, this.saleForm.value).subscribe({
//       next: (res) => {
//         console.log(res);
//         this.toastr.success('New sale added successfully');
//       },
//       error: (error) => {
//         this.toastr.error('Product Quantity is Out of Range');
//       },
//       complete: () => {
//         console.log('Is good');
//       },
//     });
//     this.saleForm.reset();
//     this.searchValue='';
//     this.router.navigateByUrl('/dashboard/sales')
//   }
  

//   // public getClient(){

//   searchValue: string = '';

//   searchName() {
//     console.log(this.searchValue);
//     this.apiService
//       .addClient()
//       .pipe(
//         map((client: any) => {
//           return client.filter((client: any) =>
//             client.first_name
//               .toLowerCase()
//               .includes(this.searchValue.toLowerCase())
//           );
//         })
//       )
//       .subscribe((filteredClients) => {
//         console.log(filteredClients);
//         this.filteredClients = filteredClients;
//       });
//      this.updateTotal()
//   }

//   selectClient(clientId: any, value: string) {
//     // console.log(clientId);
//     this.saleForm.get('client_id')?.setValue(clientId);
//     console.log(this.saleForm.value);
//     this.searchValue = value;
//     this.filteredClients = [];
//     this.isClientSelected =false;
// this.updateTotal()
//   }

// searchText:string='';
// searchProduct(){
//   console.log(this.searchText);
//   this.products$
//   .pipe(
//     (map((products:any)=>{
//       return products.filter((product:any)=>
//       product.active == true &&

//        product.stock>0&&
//         product.name.toLowerCase().includes(this.searchText.toLowerCase())    
      
     
    
//       )
      
  
//     })
  
//       )
//   ).subscribe((filteredProducts)=>{
// this.filteredProducts=filteredProducts
//   });
// this.updateTotal()
// }



// selectProduct(productId:any,value:string){
//   const product=this.filteredProducts.find((product)=>product.id === productId ) ;

 

//   const productIndex = this.saleProducts.length -1;
//   const productFormGroup=this.saleProducts.at(productIndex) as FormGroup;
//   productFormGroup.controls['id'].setValue(product.id);
//   console.log(this.saleForm.value);
//   this.searchText = value;
//   this.filteredProducts=[];
// this.updateTotal()
// }


// public cartItems:any[]=[]

// public addTocart(){
//   this.cartView=true;
//   const saleFormValue=this.saleForm.value;
//   saleFormValue.products=saleFormValue.products.map((product:any)=>({
//     id: product.id,
//     quantity: product.quantity
//   }));
//   this.cartItems.push(saleFormValue);
//   console.log(saleFormValue);
//   this.saleForm.reset();
//   this.saleForm.get('client_id')?.setValue('');

//   this.searchValue='';
// }

// public removeFromCart(index: number) {
//   this.cartItems.splice(index, 1);
// }
// cartView=false;
// public addCartItemToSales(cartItem: any) {

//   this.http.post(`${this.saleApi}`, cartItem).subscribe({
  
//     next: (res) => {
//       console.log(res);
//       this.toastr.success('Sale added successfully');
//       this.cartItems.splice(this.cartItems.indexOf(cartItem), 1);
//     },
//     error: (error) => {
//       this.toastr.error('Error adding sale');
//     }
//   });
// }
// public cartClose(){
//   this.cartView=false;
// }
// public showCartView = false;
// public cancelCart(){
//   this.showCartView=false;
// }

//   productForm!: FormGroup;

//  getTotalOrderPrice(){
//   let price=0;
  
//   for(const product of this.saleProducts.controls)
//   price += product.get('price')?.value * product.get('quantity')?.value;
// this.updateTotal
//   return price
//  }
//   getTotalOrderQuantity(){
//     let total = 0
//     for(const product of this.saleProducts.controls)
//     total += product.get('quantity')?.value;
//     this. updateTotal()
//     return total;
  
//   }

// public updateTotal():void{
//   this.orderTotal=this.saleProducts.controls.reduce((acc,val)=>{
//     acc=acc + val.value.quantity * val.value.price;
//     return acc;
//   },0)
// }

//   clientForward(){
//     this.router.navigate(['/dashboard/clients'],{queryParams:{source:'newsale'}})
//   }


public searchClients: FormGroup = new FormGroup({
  searchInput: new FormControl(''),
});
public searchProducts: FormGroup = new FormGroup({
  searchInput: new FormControl(''),
});
public salesForm: FormGroup = new FormGroup({
  client_id: new FormControl(Validators.required),
  products: new FormArray([]),
});

public searchingClients = false;
public searchingProducts = false;


public searchClientsResult: any[] = [];
public selectedClient!: any;
public searchProdutsResult: any[] = [];

public clientsList: any[] = [];
public productsList: any[] = [];

constructor(
  private http: SalesService,
  private readonly quickService:QuickService,
  private readonly productService:ProductService,
  private readonly clientService:ClientService,
  private toastr: ToastrService,
  private router: Router,
   public data:DataStorageService,
  private readonly route:ActivatedRoute,
) {}

public get selectedProducts(): FormArray {
  return this.salesForm.get('products') as FormArray;
}
public addClient(client: any) {
  this.salesForm.controls['client_id'].setValue(client.id);
  this.searchClientsResult = [];
  this.searchingClients = false;
  this.selectedClient = client;
}
public addNewClientRedirect(){
    this.router.navigate(['/dashboard/clients'],{queryParams:{source:'newsale'}})
}



public addProduct(product: any, quantity: string) {
  if (Number(quantity) > product.stock) {
    this.toastr.error( 'Quantity should be less than stock');
    return;
  }
  const productForm: FormGroup = new FormGroup({
    id: new FormControl(product.id, Validators.required),
    name: new FormControl(product.name),
    price: new FormControl(product.price) ,
    stock:new FormControl(product.stock),
    quantity: new FormControl(Number(quantity), [Validators.required,Validators.min(0),Validators.max(product.stock)]),
  });
  this.selectedProducts.push(productForm);
  this.searchProdutsResult = this.searchProdutsResult.filter(
    (obj) => obj.id !== product.id
  );
  
}

public removeSelectedClient() {
  this.selectedClient = '';
  this.searchClients.controls['searchInput'].setValue('');
  this.searchProducts.controls['searchInput'].setValue('');
  this.salesForm.reset();
  this.selectedProducts.clear();
  this.searchingClients = true;
}

public removeSelectedProducts(product_id: number) {
      const index = this.selectedProducts.controls.findIndex(  (x)   =>   x.get('id')?.value === product_id   );
      if (index >= 0) 
            this.selectedProducts.removeAt(index);
}
public getTotalOrderQuantity(){
  let total =0;
  for (const product of this.selectedProducts.controls)
    total+=product.get('quantity')?.value;
  return total;
}
public getTotalOrderPrice(){
  let price=0;
  for(const product of this.selectedProducts.controls)
    price+=( product.get('price')?.value * product.get('quantity')?.value);
  return price;
}

public confirmSale() {
  
  if (!this.salesForm.valid){
    for(let product  of this.selectedProducts.controls)
        if(product.get('quantity')?.status == 'INVALID'){
            this.toastr.error(`At ID '${product.get('id')?.value}' : Quantity greater than available stock`);
            break;
        }
  }
  else
      this.http.createSale(this.salesForm.value).subscribe((respo) => {
                                                    this.toastr.success( 'New sale added');
                                                    this.salesForm.reset();
                                                    this.router.navigate(['dashboard/sales']);
                                                  });
}
public onSearchClients(value:any){
  if (value == ''){
     this.searchClientsResult = [];
     this.searchingClients=false
  }
  else{
          const temp_searchClientsResult = this.clientsList.filter(
                    (client: any) =>client.first_name.toLowerCase().includes(value.toLowerCase()) ||
                                                client.last_name.toLowerCase().includes(value.toLowerCase()));
          if(this.selectedClient){
               this.searchClientsResult=temp_searchClientsResult.filter(client=>  client.id != this.salesForm.value.client_id);
          }
          else{
              this.searchClientsResult=temp_searchClientsResult;
          }
          this.searchingProducts=false;
          this.searchingClients=true;
          
    }
}
public onSearchProducts(value:any){
  if (value == ''){
     this.searchProdutsResult = [];
     this.searchingProducts=false;
    }
  else{
      let temp_searchProdutsResult=this.productsList.filter( (product: any) =>product.name.toLowerCase().includes(value.toLowerCase()) &&
                                                                                product.active &&
                                                                                product.stock > 0
                                                                            );
      if(this.selectedProducts.controls[0]){
          for (let product of this.selectedProducts.controls)
                temp_searchProdutsResult=temp_searchProdutsResult.filter(result=> product.value.id !=  result.id);
          this.searchProdutsResult=temp_searchProdutsResult;
      }
      else{
          this.searchProdutsResult=temp_searchProdutsResult;
      }
      this.searchingClients=false;
      this.searchingProducts=true;
       
  }
}
public resumeData(){
  const previous_state =this.data.newSale_state;
  if(previous_state?.selectedClient || previous_state?.salesForm?.get('products')){
    this.salesForm=previous_state.salesForm;
    this.selectedClient=previous_state.selectedClient;
    this.searchingClients=previous_state.searchingClients;
    this.searchingProducts=previous_state.searchingProducts;
  }
  

 }
public onQuickSale(params:{[source:string]:string}){
          if(params['quick_sale']){
            this.salesForm.reset();
            this.selectedClient='';
            this.selectedProducts.clear();
            console.log(this.salesForm.value)
            this.quickService.getById(Number(params['quick_sale'])).subscribe((quickSale:any)=>{
          
                                                                        for(let product of quickSale.products){
                                                                    
                                                                              this.addProduct(product,'1')
                                                                              console.log(product)}
                                                                        // console.log(this.salesForm.value)

                                                                        })
        }

}

ngOnInit() {

   this.resumeData()
  this.route.queryParams.subscribe((params:{[source:string]:string})=>{ this.onQuickSale(params)})
  
  this.clientService.addClient().subscribe((response: any) => (this.clientsList = response));
  this.productService.getProducts().subscribe((response: any) => (this.productsList = response));

  this.searchClients.get('searchInput')?.valueChanges.subscribe((value) => {  this.onSearchClients(value)  });

  this.searchProducts.get('searchInput')?.valueChanges.subscribe((value) => {  this.onSearchProducts(value)  });

}
ngOnDestroy() {
  const current_state = {
                            selectedClient:this.selectedClient,
                            salesForm:this.salesForm,
                            searchingClients:this.searchingClients,
                            searchingProducts:this.searchingProducts

                         }
  // this.dataStorage.newSale_state=current_state;
}

}


