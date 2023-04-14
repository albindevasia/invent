import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DataStorageService } from '../../../../Authentification/data.service';
import { Router } from '@angular/router';
import { ApiService } from '../../../../services/api.service';
import { ProductService } from '../../../../core/Http/Api/products.service';
import { QuickService } from 'src/app/core/Http/Api/quicksale.service';

@Component({
  selector: 'app-newquick',
  templateUrl: './newquick.component.html',
  
})
export class NewquickComponent {

  constructor(
    private readonly productService:ProductService,
    
    private readonly quickService:QuickService,
    private readonly toastr: ToastrService,
    private readonly router: Router,
    public readonly dataStorage:DataStorageService
  ) {}
public  searchProducts: FormGroup = new FormGroup({
    searchInput: new FormControl(''),
  });


public  quickSaleForm: FormGroup = new FormGroup({
    name: new FormControl('',Validators.required),
    products: new FormArray([],Validators.required),
  });

public  products_view:any[]=[];

public  searchingProducts = false;
  
public  quickSaleName:string='';
public  searchProdutsResult: any[] = [];

public  productsList: any[] = [];

 

public  get selectedProducts(): FormArray {
    return this.quickSaleForm.get('products') as FormArray;
  }
 
 
public  addQuickSaleName(quickSaleName:string){
    this.quickSaleName=quickSaleName
    this.quickSaleForm.get('name')?.setValue(quickSaleName);
  }


public  addProduct(product: any) {
    const id :FormControl = new FormControl(product.id)
    this.products_view.push({
                              id:product.id,
                              name:product.name,
                              price:product.price,
                              stock:product.stock
                              })
    
    this.selectedProducts.push(id);
    this.searchProdutsResult = this.searchProdutsResult.filter((obj) => obj.id !== product.id);
    
  }
public  removeQuickSaleName(){
      this.quickSaleName='';
      this.quickSaleForm.get('name')?.reset();
  }
 

public  removeSelectedProducts(product_id: number) {
        const index = this.selectedProducts.controls.findIndex(  (x)   =>   x.value === product_id   );
        if (index >= 0) 
              this.selectedProducts.removeAt(index);
        this.products_view=this.products_view.filter((product:any)=> product.id!=product_id);
  }


  

public confirmSale() {
    
        if(!this.quickSaleForm.valid){
          this.toastr.error('Add name and products');
          return;
        }
        this.quickService.createQuickSale(this.quickSaleForm.value).subscribe((respo) => {
                                                      this.toastr.success( 'New quick-sale added');
                                                      this.quickSaleForm.reset();
                                                      this.selectedProducts.clear();
                                                      this.products_view=[];
                                                      this.quickSaleName='';
                                                      this.router.navigate(['../../quicksale']);
                                                    });
  }
  
 public  onSearchProducts(value:any){
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
                  temp_searchProdutsResult=temp_searchProdutsResult.filter(result=> product.value !=  result.id);
            this.searchProdutsResult=temp_searchProdutsResult;
        }
        else{
            this.searchProdutsResult=temp_searchProdutsResult;
        }
        
        this.searchingProducts=true;
         
    }
  }
public  resumeData(){
    const previous_state =this.dataStorage.newSale_state;
    if(previous_state?.selectedClient || previous_state?.salesForm?.get('products')){
      this.quickSaleForm=previous_state.salesForm;

      this.searchingProducts=previous_state.searchingProducts;
    }
    

  }
  

  

  ngOnInit() {

    
    
    this.productService.getProducts().subscribe((response: any) => (this.productsList = response));

  

    this.searchProducts.get('searchInput')?.valueChanges.subscribe((value) => {  this.onSearchProducts(value)  });
    

  }
  

}
