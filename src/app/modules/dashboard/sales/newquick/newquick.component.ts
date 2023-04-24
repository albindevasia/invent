import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DataStorageService } from '../../../../Authentification/data.service';
import { ActivatedRoute, Router } from '@angular/router';

import { ProductService } from '@apiproducts.service';
import { QuickService } from '@apiquicksale.service';
import { IProducts } from 'src/app/shared/interface';


@Component({
  selector: 'app-newquick',
  templateUrl: './newquick.component.html',
})
export class NewquickComponent {
public  mode!: string;
 
public  sale: any;

  constructor(
    private readonly productService: ProductService,

    private readonly quickService: QuickService,
    private readonly toastr: ToastrService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    public readonly dataStorage: DataStorageService
  ) {}
  public searchProducts: FormGroup = new FormGroup({
    searchInput: new FormControl(''),
  });
public quickSale!:any

  public quickSaleForm: FormGroup = new FormGroup({
  
    name: new FormControl('', Validators.required),
    products: new FormArray([], Validators.required),
  });

  public products_view: any[] = [];

  public searchingProducts = false;

  public quickSaleName: string = '';
  public searchProdutsResult: any[] = [];

  public productsList: any[] = [];

  public get selectedProducts(): FormArray {
   
    return this.quickSaleForm.get('products') as FormArray;
  }

  public addQuickSaleName(quickSaleName: string) {
  
    this.quickSaleName = quickSaleName;
    this.quickSaleForm.get('name')?.setValue(quickSaleName);
  }

  public addProduct(product: IProducts) {
    
    const id: FormControl = new FormControl(product.id);
    this.products_view.push({
      // id:product.id,
      // name:product.name,
      // price:product.price,
      // stock:product.stock
      ...product,
    });
   
    this.selectedProducts.push(id);
    this.searchProdutsResult = this.searchProdutsResult.filter(
      (obj) => obj.id !== product.id
    );
  }
  public removeQuickSaleName() {
    this.quickSaleName = '';
    this.quickSaleForm.get('name')?.reset();
  }

  public removeSelectedProducts(product_id: number) {
    const index = this.selectedProducts.controls.findIndex(
      (x) => x.value === product_id
    );
    if (index >= 0) this.selectedProducts.removeAt(index);
    this.products_view = this.products_view.filter(
      (product: any) => product.id != product_id
    );
  }

  public confirmSale() {

    if (!this.quickSaleForm.valid) {
      this.toastr.error('Add name and products');
      return;
    }
    
    this.quickService
      .createQuickSale(this.quickSaleForm.value)
      .subscribe((respo) => {
        this.toastr.success('New quick-sale added');
        this.quickSaleForm.reset();
        this.selectedProducts.clear();
        this.products_view = [];
        this.quickSaleName = '';
        this.router.navigate(['/dashboard/sales/quicksale']);
      });
  }

  public onSearchProducts(value: any) {

    if (value == '') {
      this.searchProdutsResult = [];
      this.searchingProducts = false;
    } else {
      let temp_searchProdutsResult = this.productsList.filter(
        (product: any) =>
          product.name.toLowerCase().includes(value.toLowerCase()) &&
          product.active &&
          product.stock > 0
      );
      if (this.selectedProducts.controls[0]) {
        for (let product of this.selectedProducts.controls)
          temp_searchProdutsResult = temp_searchProdutsResult.filter(
            (result) => product.value != result.id
          );
        this.searchProdutsResult = temp_searchProdutsResult;
      } else {
        this.searchProdutsResult = temp_searchProdutsResult;
      }

      this.searchingProducts = true;
    }
  }
  public resumeData() {
   
    const previous_state = this.dataStorage.newSale_state;
    if (
      previous_state?.selectedClient ||
      previous_state?.salesForm?.get('products')
    ) {
      this.quickSaleForm = previous_state.salesForm;

      this.searchingProducts = previous_state.searchingProducts;
    }
}
  public newQuick(params: { [source: string]: string }){

   
    if(params['quickNew']){
      this.mode='new'
      this.quickSaleForm.reset();
    }
  }
 
  public onQuickSale(params: { [source: string]: string }) {
    this.mode='edit';
    if (params['quick_sale']) {
      this.quickSaleForm.reset();
       this.selectedProducts.clear();

      this.quickService
        .getById(Number(params['quick_sale']))
        .subscribe((quickSale: any) => {
          for (let product of quickSale.products) {
            this.addProduct(product);
          
            
    this.addQuickSaleName(quickSale.name);
      
            this.quickSaleForm.addControl('id',new FormControl(quickSale.id,Validators.required))

         
          }
       
        });
    }
  }
public getConfirmButton():string{
   if(this.mode == 'new')

 return 'confirm';
else{
 return 'update';
}
}

  public saveQuick(){
  this.quickService.updateQuick(this.quickSaleForm.value).subscribe((res)=>{
    if (res) {
      this.toastr.success(
         `QuickSale  has been Edited successfully.`
      );
     
   this.router.navigateByUrl('/dashboard/sales/quicksale')
    }
  
  })
  }
   public finalSubmit():void{

     if(this.mode == 'new'){
    
    this.confirmSale();
    
       }  else{
    
   this.saveQuick();
       }
    
    
    
    }

  ngOnInit() {
    

    this.route.queryParams.subscribe((params: { [source: string]: string }) => {
      this.onQuickSale(params);
    });
    this.route.queryParams.subscribe((params: { [source: string]: string }) => {
      this.newQuick(params);
    });
    this.productService
      .getProducts()
      .subscribe((response: any) => (this.productsList = response));

    this.searchProducts.get('searchInput')?.valueChanges.subscribe((value) => {
      this.onSearchProducts(value);
    });
  }
}
